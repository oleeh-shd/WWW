import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from 'src/roles/dto/create-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { Deposit } from './deposits.model';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DepositsService {
  constructor(
    @InjectModel(Deposit) private depositRepository: typeof Deposit,
    private roleService: RolesService,
    private userService: UsersService,
  ) {}

  async makeDeposit({ email, ...dto }: CreateDepositDto) {
    const deposit = await this.depositRepository.create(dto);
    const role = await this.roleService.getRoleByValue(UserRoles.INVESTOR);
    const user = await this.userService.getUserByEmail(email);

    if (!user.roles.some((existRole) => existRole.id === role.id)) {
      await user.$add('roles', role.id);
      user.roles = [...user.roles, role];
    }

    return deposit;
  }

  @Cron('0 10 * * * *')
  async increaceDeposit() {
    const deposits = await this.depositRepository.findAll();
    if (!deposits.length) {
      return;
    }

    deposits.forEach(async ({ amount, id }) => {
      await this.depositRepository.increment('amount', {
        by: amount * 0.01,
        where: { id },
      });
    });
  }

  async withdrawDeposit(id: number, amount: number) {
    const deposit = await this.depositRepository.findOne({
      where: {
        id,
      },
    });

    if (deposit.amount < amount) {
      throw new HttpException('not enough money', HttpStatus.BAD_REQUEST);
    }
    const updatedDeposit = await this.depositRepository.decrement('amount', {
      by: amount,
      where: { id },
    });
    return updatedDeposit;
  }

  async updateDeposit(id: number, amount: number) {
    const updatedDeposit = await this.depositRepository.increment('amount', {
      by: amount,
      where: { id },
    });
    return updatedDeposit;
  }

  async getDepositById(id: number) {
    return await this.depositRepository.findOne({ where: { id } });
  }
}

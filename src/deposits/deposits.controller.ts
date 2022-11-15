import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decarator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRoles } from 'src/roles/dto/create-role.dto';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@ApiTags('Deposit')
@Controller('deposits')
export class DepositsController {
  constructor(private depositsServices: DepositsService) {}

  @ApiOperation({ summary: 'get app status' })
  @ApiResponse({ status: 200, type: Deposit })
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.depositsServices.getAllDepositsSum();
  }

  @ApiOperation({ summary: 'withdraw any amount of money' })
  @ApiResponse({ status: 201, type: Deposit })
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/withdrawAnySum')
  withdrawAny(@Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsServices.withdrawAnySum(updateDepositDto.amount);
  }

  @ApiOperation({ summary: 'get deposit by id' })
  @ApiResponse({ status: 200, type: Deposit })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.depositsServices.getDepositById(id);
  }

  @ApiOperation({ summary: 'make deposit' })
  @ApiResponse({ status: 201, type: Deposit })
  @Post()
  create(@Body() depositDto: CreateDepositDto) {
    return this.depositsServices.makeDeposit(depositDto);
  }

  @ApiOperation({ summary: 'update deposit' })
  @ApiResponse({ status: 204, type: Deposit })
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsServices.updateDeposit(id, updateDepositDto.amount);
  }

  @ApiOperation({ summary: 'withdraw deposit' })
  @ApiResponse({ status: 204, type: Deposit })
  @Post('/:id')
  withdraw(
    @Param('id') id: number,
    @Body() updateDepositDto: UpdateDepositDto,
  ) {
    return this.depositsServices.withdrawDeposit(id, updateDepositDto.amount);
  }
}

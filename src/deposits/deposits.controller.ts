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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.depositsServices.getAllDepositsSum();
  }

  @ApiOperation({ summary: 'withdraw any amount of money' })
  @ApiResponse({ status: 201, type: Deposit })
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/withdrawAnySum')
  withdrawAny(@Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsServices.withdrawAnySum(updateDepositDto.amount);
  }

  @ApiOperation({ summary: 'get deposit by user id' })
  @ApiResponse({ status: 200, type: Deposit })
  @Roles(UserRoles.INVESTOR, UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  getOne(@Param('userId') userId: number) {
    return this.depositsServices.getDepositById(userId);
  }

  @ApiOperation({ summary: 'make deposit' })
  @ApiResponse({ status: 201, type: Deposit })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() depositDto: CreateDepositDto) {
    return this.depositsServices.makeDeposit(depositDto);
  }

  @ApiOperation({ summary: 'update deposit' })
  @ApiResponse({ status: 204, type: Deposit })
  @Roles(UserRoles.INVESTOR, UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  update(
    @Param('userId') userId: number,
    @Body() updateDepositDto: UpdateDepositDto,
  ) {
    return this.depositsServices.updateDeposit(userId, updateDepositDto.amount);
  }

  @ApiOperation({ summary: 'withdraw deposit' })
  @ApiResponse({ status: 204, type: Deposit })
  @Roles(UserRoles.INVESTOR, UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/:userId')
  withdraw(
    @Param('userId') userId: number,
    @Body() updateDepositDto: UpdateDepositDto,
  ) {
    return this.depositsServices.withdrawDeposit(
      userId,
      updateDepositDto.amount,
    );
  }
}

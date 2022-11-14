import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@ApiTags('Deposit')
@Controller('deposits')
export class DepositsController {
  constructor(private depositsServices: DepositsService) {}

  @ApiOperation({ summary: 'get deposit' })
  @ApiResponse({ status: 200, type: Deposit })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.depositsServices.getDepositById(id);
  }

  @ApiOperation({ summary: 'making deposit' })
  @ApiResponse({ status: 201, type: Deposit })
  @Post()
  create(@Body() depositDto: CreateDepositDto) {
    return this.depositsServices.makeDeposit(depositDto);
  }

  @ApiOperation({ summary: 'update deposit' })
  @ApiResponse({ status: 204, type: Deposit })
  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body('amount') amount: CreateDepositDto['amount'],
  ) {
    return this.depositsServices.updateDeposit(id, amount);
  }

  @ApiOperation({ summary: 'withdraw deposit' })
  @ApiResponse({ status: 200, type: Deposit })
  @Post('/:id')
  withdraw(
    @Param('id') id: number,
    @Body('amount') amount: CreateDepositDto['amount'],
  ) {
    return this.depositsServices.withdrawDeposit(id, amount);
  }
}

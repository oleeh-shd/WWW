import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepositDto {
  @ApiProperty({ example: '5000', description: 'deposit sum' })
  readonly amount: number;
}

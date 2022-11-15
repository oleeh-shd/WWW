import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositDto {
  @ApiProperty({ example: '1', description: 'user id' })
  readonly userId: number;

  @ApiProperty({ example: 'qwe@asd.com', description: 'user email' })
  readonly email: string;

  @ApiProperty({ example: '5000', description: 'deposit sum' })
  readonly amount: number;

  @ApiProperty({ example: 'USD', description: 'deposit currency' })
  readonly currency: 'USD';
}

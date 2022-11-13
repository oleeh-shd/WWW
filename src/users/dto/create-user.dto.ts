import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'qwe@asd.com', description: 'email' })
  readonly email: string;
  @ApiProperty({ example: '123123123', description: 'password' })
  readonly password: string;
}

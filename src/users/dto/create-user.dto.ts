import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'qwe@asd.com', description: 'email' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'qwe123qwe', description: 'password' })
  @IsString({ message: 'Should be string' })
  @Length(8, 16, { message: 'min length should be 4, max length should be 16' })
  readonly password: string;

  @ApiProperty({ example: '1', description: 'invitors id' })
  readonly invitedBy: number | null;
}

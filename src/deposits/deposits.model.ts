import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

interface DepositCreationAttrs {
  amount: number;
  email: string;
}

@Table({ tableName: 'deposits' })
export class Deposit extends Model<Deposit, DepositCreationAttrs> {
  @ApiProperty({ example: '1', description: 'deposit id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '5000', description: 'amount of money' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @ApiProperty({ example: 'USD', description: 'currency' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

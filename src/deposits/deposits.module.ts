import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { DepositsController } from './deposits.controller';
import { Deposit } from './deposits.model';
import { DepositsService } from './deposits.service';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService],
  imports: [
    SequelizeModule.forFeature([Deposit, User]),
    UsersModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class DepositsModule {}

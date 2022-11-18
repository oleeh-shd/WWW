import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}

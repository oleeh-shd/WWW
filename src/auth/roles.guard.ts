import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { ROLES_KEY } from './roles-auth.decarator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
        ROLES_KEY,
        [context.getClass(), context.getHandler()],
      );

      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      const { roles } = await this.userService.getUserByEmail(user.email);

      return roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException('no access', HttpStatus.FORBIDDEN);
    }
  }
}

import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleType, User, Role } from '@prisma/client';

export const Roles = createParamDecorator(
  (data: RoleType[], ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: User & { role: Role } }>();

    if (!data.includes(request.user.role.roleName)) {
      throw new ForbiddenException(
        'you do not have permission to access this resource',
      );
    }
    console.log(request.user);
    return request.user;
  },
);

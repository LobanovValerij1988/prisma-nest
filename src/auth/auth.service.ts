import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user || !user.passwordHash) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatch = await argon.verify(user.passwordHash, dto.password);
    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return user;
  }

  async signup(dto: SignUpDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new NotFoundException('Password and password confirm do not match');
    }
    if (dto.roleId) {
      const isRoleExists = await this.prisma.role.findUnique({
        where: {
          id: dto.roleId,
        },
      });
      if (!isRoleExists) {
        throw new NotFoundException('Role does not exist');
      }
    }
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: hash,
          userName: dto.userName,
          roleId: dto.roleId,
          googleId: dto.googleId,
        },
        select: {
          id: true,
          email: true,
          userName: true,
          roleId: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}

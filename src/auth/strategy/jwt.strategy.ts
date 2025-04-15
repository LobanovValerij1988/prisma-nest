import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('provide a JWT_SECRET in .env');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const userRole = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        role: true,
      },
    });
    if (userRole?.role?.roleName !== 'Administrator') {
      throw new ForbiddenException('access forbidden');
    }

    return { userId: payload.sub, email: payload.email };
  }
}

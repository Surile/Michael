import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'samle',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('payload', payload);
    const user = await this.adminService.validateUser(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

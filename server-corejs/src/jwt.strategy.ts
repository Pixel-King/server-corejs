import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTUserInfo } from './auth/models/auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_JWT_KEY,
    });
  }

  async validate(payload: JWTUserInfo): Promise<JWTUserInfo> {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}

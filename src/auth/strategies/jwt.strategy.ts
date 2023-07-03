import { PayloadToken } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportUse } from '../utils/passport.user';
import { JWT_SECRET } from '../../config/config';

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      JwtStr,
      StrategyOptions,
      (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
        'jwt',
        JwtStr,
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        this.validate
    );
  }
}

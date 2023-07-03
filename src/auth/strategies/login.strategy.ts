import { UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { PassportUse } from '../utils/passport.user';

const authService: AuthService = new AuthService();

export class LoginStrategy {
  // No funciona inyectando el service
  // constructor(private readonly authService: AuthService = new AuthService()) {}
  async validate(
    username: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    const user = await authService.validateUser(username, password);
    if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      'login',
      LocalStrategy,
      { usernameField: 'username', passwordField: 'password' },
      this.validate
    );
  }
}

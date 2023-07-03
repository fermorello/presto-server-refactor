import { Response, Request } from 'express';
import { SharedMiddleware } from '../shared/middlewares/shared.middleware';
import { AuthController } from './controllers/auth.controller';
import { BaseRouter } from '../config/base.router';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post(
      '/login',
      this.middleware.passAuth('login'),
      (req: Request, res: Response) => this.controller.login(req, res)
    );
  }
}

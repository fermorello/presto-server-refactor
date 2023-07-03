import { NextFunction, Request, Response } from 'express';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';
import { BaseRouter } from '../config/base.router';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }
  routes(): void {
    this.router.post(
      '/users',
      (req: Request, res: Response, next: NextFunction) => [
        this.middleware.userValidator(req, res, next),
      ],
      (req: Request, res: Response) => this.controller.createUser(req, res)
    );
    this.router.get(
      '/users',
      (req: Request, res: Response) => this.controller.getUsers(req, res)
    );
    this.router.get(
      '/users/:id',
      (req: Request, res: Response) => this.controller.getUserById(req, res)
    );
  }
}

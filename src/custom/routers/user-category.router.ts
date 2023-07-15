import { NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../../config/base.router';
import { UserCategoryController } from '../controllers/user-category';
import { UserCategoryMiddleware } from '../middlewares/user-category.middleware';

export class UserCategoryRouter extends BaseRouter<UserCategoryController, UserCategoryMiddleware> {
  constructor() {
    super(UserCategoryController, UserCategoryMiddleware);
  }

  routes(): void {
    this.router.get('/user-categories',  this.middleware.passAuth('jwt'), (req: Request, res: Response) => this.controller.getAllUserCategoriesByUserId(req, res));
    this.router.post('/user-categories',  this.middleware.passAuth('jwt'), (req: Request, res: Response) => this.controller.createUserCategory(req, res));
  }
}

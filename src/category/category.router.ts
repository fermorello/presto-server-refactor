import { NextFunction, Request, Response } from 'express';
import { CategoryController } from './controllers/category.controller';
import { CategoryMiddleware } from './middlewares/category.middleware';
import { BaseRouter } from '../config/base.router';

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware);
  }
  routes(): void {
    this.router.get('/categories', (req: Request, res: Response) =>
      this.controller.getCategories(req, res)
    );
    this.router.get('/categories/:id', (req: Request, res: Response) =>
      this.controller.getCategoryById(req, res)
    );
    this.router.post(
      '/categories',
      (req: Request, res: Response, next: NextFunction) => [
        this.middleware.categoryValidator(req, res, next),
      ],
      (req: Request, res: Response) => this.controller.createCategory(req, res)
    );
    this.router.delete('/categories/:id', (req: Request, res: Response) =>
      this.controller.deleteCategory(req, res)
    );
  }
}

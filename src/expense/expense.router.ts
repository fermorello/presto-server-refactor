import { NextFunction, Request, Response } from 'express';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseMiddleware } from './middlewares/expense.middleware';
import { BaseRouter } from '../config/base.router';

export class ExpenseRouter extends BaseRouter<ExpenseController, ExpenseMiddleware> {
  constructor() {
    super(ExpenseController, ExpenseMiddleware);
  }
  routes(): void {
    this.router.get('/expenses', (req: Request, res: Response) =>
      this.controller.getExpensesByUser(req, res)
    );
    this.router.get('/expenses/:id', (req: Request, res: Response) =>
      this.controller.getExpenseById(req, res)
    );
    this.router.post(
      '/expenses',
      (req: Request, res: Response, next: NextFunction) => [
        this.middleware.categoryValidator(req, res, next),
      ],
      (req: Request, res: Response) => this.controller.createExpense(req, res)
    );
    this.router.delete('/expenses/:id', (req: Request, res: Response) =>
      this.controller.deleteExpense(req, res)
    );
  }
}

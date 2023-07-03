import { NextFunction, Request, Response } from 'express';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseMiddleware } from './middlewares/expense.middleware';
import { BaseRouter } from '../config/base.router';

export class ExpenseRouter extends BaseRouter<ExpenseController, ExpenseMiddleware> {
  constructor() {
    super(ExpenseController, ExpenseMiddleware);
  }
  routes(): void {
    this.router.get('/expenses', this.middleware.passAuth('jwt'), (req: Request, res: Response) => this.controller.getExpensesByUser(req, res));
    this.router.get('/expenses/category/sum/date', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.sumAllExpenseByUserAndCategoryAndDate(req, res),
    );
    this.router.get('/expenses/category/sum/month', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.getMonthlyExpenseSum(req, res),
    );
    this.router.get('/expenses/sum/month', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.getAllMonthlyExpenseSum(req, res),
    );
    this.router.get('/expenses/category/:id', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.getExpensesByUserAndCategory(req, res),
    );
    this.router.get('/expenses/total', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.sumAllExpenseByUserAndCategory(req, res),
    );
    this.router.get('/expenses/date', this.middleware.passAuth('jwt'), (req: Request, res: Response) =>
      this.controller.getAllExpenseByDates(req, res),
    );
    this.router.get('/expenses/:id', (req: Request, res: Response) => this.controller.getExpenseById(req, res));
    this.router.post(
      '/expenses',
      this.middleware.passAuth('jwt'),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.expenseValidator(req, res, next)],
      (req: Request, res: Response) => this.controller.createExpense(req, res),
    );
    this.router.put(
      '/expenses/:id',
      this.middleware.passAuth('jwt'),
      (req: Request, res: Response) => this.controller.updateExpense(req, res),
    );
    this.router.delete('/expenses/:id', (req: Request, res: Response) => this.controller.deleteExpense(req, res));
  }
}

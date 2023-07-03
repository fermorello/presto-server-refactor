import { NextFunction, Request, Response } from 'express';
import { ExpenseDTO } from '../dto/expense.dto';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/http.response';
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware';

export class ExpenseMiddleware extends SharedMiddleware {
    constructor(){
      super();
    }

  expenseValidator(req: Request, res: Response, next: NextFunction) {
    const { expense_name, description, date, category, isDollar } =
      req.body;
    const valid = new ExpenseDTO();
    valid.expense_name = expense_name;
    valid.description = description;
    valid.date = date;
    valid.category = category;
    valid.isDollar = isDollar;
    validate(valid).then((err) => {
        if(err.length) {
            return this.httpResponse.ERROR(res, err);
        } else {
            next();
        }
    })
  }
}

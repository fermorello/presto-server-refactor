import { NextFunction, Request, Response } from 'express';
import { ExpenseDTO } from '../dto/expense.dto';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/http.response';

export class ExpenseMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}

  categoryValidator(req: Request, res: Response, next: NextFunction) {
    const { name, description, date, category, isDollar } =
      req.body;
    const valid = new ExpenseDTO();
    valid.name = name;
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

import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/http.response';
import { UserCategoryDTO } from '../dto/user-category.dto';
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware';

export class UserCategoryMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  categoryValidator(req: Request, res: Response, next: NextFunction) {
    const { user_id, category_name } = req.body;
    const valid = new UserCategoryDTO();
    valid.user_id = user_id;
    valid.category_name = category_name;
    validate(valid).then((err) => {
      if (err.length) {
        return this.httpResponse.ERROR(res, err);
      } else {
        next();
      }
    });
  }
}

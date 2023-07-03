import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../dto/user.dto';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/http.response';
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware';

export class UserMiddleware extends SharedMiddleware {
    constructor(){
      super();
    }

  userValidator(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } =
      req.body;
    const valid = new UserDTO()
    valid.username = username;
    valid.email = email;
    valid.password = password;
    validate(valid).then((err) => {
        if(err.length) {
            return this.httpResponse.ERROR(res, err);
        } else {
            next();
        }
    })
  }
}

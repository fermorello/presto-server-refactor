import passport from 'passport';
import { HttpResponse } from '../response/http.response';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '../../user/entities/user.entity';

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(type: string){
    return passport.authenticate(type, { session: false });
  }
}


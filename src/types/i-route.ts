import {HttpMethod} from './http-method.js';
import {Request, Response, NextFunction} from 'express';
import {IMiddleware} from '../common/middlewares/types/i-middleware.js';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler(request: Request, response: Response, next: NextFunction): void;
  middlewares?: IMiddleware[];
}

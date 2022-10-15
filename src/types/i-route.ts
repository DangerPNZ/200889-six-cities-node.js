import {HttpMethod} from './http-method.js';
import {Request, Response, NextFunction} from 'express';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler(request: Request, response: Response, next: NextFunction): void;
}

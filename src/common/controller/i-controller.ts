import {Router, Response} from 'express';
import {IRoute} from '../../types/i-route.js';

export interface IController {
  readonly router: Router;
  addRoute(route: IRoute): void;
  send<T>(response: Response, statusCode: number, data: T): void;
  ok<T>(response: Response, data: T): void;
  created<T>(response: Response, data: T): void;
  noContent<T>(response: Response, data: T): void;
}

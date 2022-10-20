import {IController} from './i-controller.js';
import {injectable} from 'inversify';
import {Response, Router} from 'express';
import {ILogger} from '../logger/i-logger.js';
import {IRoute} from '../../types/i-route.js';
import {StatusCodes} from 'http-status-codes';
import asyncHandler from 'express-async-handler';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;

  constructor(protected readonly logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: IRoute) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );
    const allHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(response: Response, statusCode: number, data: T): void {
    response
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(response: Response, data: T): void {
    this.send(response, StatusCodes.CREATED, data);
  }

  public noContent<T>(response: Response, data: T): void {
    this.send(response, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}

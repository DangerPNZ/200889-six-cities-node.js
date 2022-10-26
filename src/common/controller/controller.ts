import {IController} from './i-controller.js';
import {injectable} from 'inversify';
import {Response, Router} from 'express';
import {ILogger} from '../logger/i-logger.js';
import {IRoute} from '../../types/i-route.js';
import {StatusCodes} from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {IConfig} from '../config/i-config.js';
import {UnknownObject} from '../../types/unknown-object.js';
import {getFullServerPath, transformObject} from '../../utils/common.js';
import {STATIC_DIRECTORY, STATIC_RESOURCE_FIELDS, UPLOAD_DIRECTORY} from '../../app/constants.js';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;

  constructor(
    protected readonly logger: ILogger,
    protected readonly configService: IConfig
  ) {
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

  protected addStaticPath(data: UnknownObject): void {
    const fullServerPath = getFullServerPath(this.configService.get('HOST'), this.configService.get('PORT'));
    transformObject(
      STATIC_RESOURCE_FIELDS,
      `${fullServerPath}/${STATIC_DIRECTORY}`,
      `${fullServerPath}/${UPLOAD_DIRECTORY}`,
      data
    );
  }

  public send<T>(response: Response, statusCode: number, data: T): void {
    this.addStaticPath(data as UnknownObject);
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

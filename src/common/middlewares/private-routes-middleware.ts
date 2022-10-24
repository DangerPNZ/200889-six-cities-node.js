import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';
import HttpError from '../errors/http-error.js';
import {IMiddleware} from './types/i-middleware.js';

export class PrivateRouteMiddleware implements IMiddleware {
  public async execute(request: Request, _response: Response, next: NextFunction): Promise<void> {
    if (!request.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}

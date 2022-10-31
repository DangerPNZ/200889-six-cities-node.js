import {NextFunction, Request, Response} from 'express';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {IMiddleware} from './types/i-middleware.js';

export class AnonymousUserMiddleware implements IMiddleware {

  public async execute(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = request.headers?.authorization;

    if (authorizationHeader) {
      return next(new HttpError(
        StatusCodes.FORBIDDEN,
        'User must be anonymous',
        'AnonymousUserMiddleware')
      );
    }

    return next();
  }
}

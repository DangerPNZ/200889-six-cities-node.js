import {IExceptionFilter} from './i-exception-filter.js';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../logger/i-logger.js';
import {inject, injectable} from 'inversify';
import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import {createErrorObject} from '../../utils/common.js';
import HttpError from './http-error.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILogger) private logger: ILogger
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  private handleHttpError(error: HttpError, _request: Request, response: Response, _next: NextFunction) {
    if (error.detail) {
      this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    } else {
      this.logger.error(`${error.httpStatusCode} — ${error.message}`);
    }

    response
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _request: Request, response: Response, _next: NextFunction) {
    this.logger.error(error.message);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, request: Request, response: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, request, response, next);
    }

    this.handleOtherError(error, request, response, next);
  }
}

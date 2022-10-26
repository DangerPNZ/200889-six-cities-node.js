import {IExceptionFilter} from './i-exception-filter.js';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../logger/i-logger.js';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {createErrorObject} from '../../utils/common.js';
import HttpError from './http-error.js';
import {ServiceError} from '../../types/service-error.js';
import ValidationError from './validation-error.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILogger) private logger: ILogger
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  private handleHttpError(error: HttpError, _request: Request, response: Response) {
    if (error.detail) {
      this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    } else {
      this.logger.error(`${error.httpStatusCode} — ${error.message}`);
    }

    response
      .status(error.httpStatusCode)
      .json(createErrorObject(ServiceError.CommonError, error.message));
  }

  private handleOtherError(error: Error, _request: Request, response: Response) {
    this.logger.error(error.message);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ServiceError.ServiceError, error.message));
  }

  private handleValidationError(error: ValidationError, _request: Request, response: Response) {
    this.logger.error(`[Validation Error]: ${error.message}`);
    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    response
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ServiceError.ValidationError, error.message, error.details));
  }

  public catch(error: Error | HttpError | ValidationError, request: Request, response: Response): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, request, response);
    } else if (error instanceof ValidationError) {
      return this.handleValidationError(error, request, response);
    }

    this.handleOtherError(error, request, response);
  }
}

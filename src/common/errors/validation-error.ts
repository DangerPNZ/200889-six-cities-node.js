import {StatusCodes} from 'http-status-codes';
import {IValidationErrorField} from '../../types/i-validation-error-field.js';

export default class ValidationError extends Error {
  public httpStatusCode!: number;
  public details: IValidationErrorField[] = [];

  constructor(message: string, errors: IValidationErrorField[]) {
    super(message);

    this.httpStatusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.details = errors;
  }
}

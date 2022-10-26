import {NextFunction, Request, Response} from 'express';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import {validate} from 'class-validator';
import {plainToInstance} from 'class-transformer';
import {IMiddleware} from './types/i-middleware.js';
import ValidationError from '../errors/validation-error.js';
import {transformErrors} from '../../utils/common.js';

export class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute(request: Request, _response: Response, next: NextFunction): Promise<void> {
    const {body} = request;
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: '${request.originalUrl}'`, transformErrors(errors));
    }

    next();
  }
}

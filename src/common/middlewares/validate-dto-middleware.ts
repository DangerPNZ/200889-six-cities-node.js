import {NextFunction, Request, Response} from 'express';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import {validate} from 'class-validator';
import {StatusCodes} from 'http-status-codes';
import {plainToInstance} from 'class-transformer';
import {IMiddleware} from './types/i-middleware.js';

export class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, response: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      console.log(errors);
      response.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}

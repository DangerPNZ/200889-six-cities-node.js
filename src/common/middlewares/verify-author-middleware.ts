import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {IMiddleware} from './types/i-middleware.js';
import HttpError from '../errors/http-error.js';
import {IDocumentAuthor} from './types/i-documents-author.js';

export class VerifyAuthorMiddleware <
  K extends string, T extends IDocumentAuthor<K, Record<K, { _id: unknown; } | undefined>>
  > implements IMiddleware {
  constructor(
    private readonly service: T,
    private readonly entityName: string,
    private readonly documentIdName: string,
    private readonly authorParam: K
  ) {}

  public async execute({params, user}: Request, _response: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.documentIdName];
    const document = await this.service.get(documentId);

    if (document) {
      const documentAuthor = document[this.authorParam];
      const documentAuthorId = documentAuthor?._id;
      const authorId = user.id;
      if(String(documentAuthorId) !== String(authorId)) {
        throw new HttpError(
          StatusCodes.FORBIDDEN,
          `${this.entityName} with ${this.documentIdName} belongs to another user. Access is denied`,
          'VerifyAuthorMiddleware'
        );
      }
    } else {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'VerifyAuthorMiddleware'
      );
    }

    next();
  }
}

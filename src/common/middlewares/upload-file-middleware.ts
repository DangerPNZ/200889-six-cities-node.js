import {NextFunction, Request, Response} from 'express';
import {nanoid} from 'nanoid';
import multer, {diskStorage} from 'multer';
import mime from 'mime-types';
import {IMiddleware} from './types/i-middleware.js';

export class UploadFileMiddleware implements IMiddleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_request, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const fileName = nanoid();
        callback(null, `${fileName}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(request, response, next);
  }
}

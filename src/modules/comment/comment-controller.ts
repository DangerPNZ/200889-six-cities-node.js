import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {ICommentService} from './i-comment-service.js';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment-response.js';
import {DataCommentDto} from './dto/comment-dto.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {DEFAULT_COMMENTS_LIMIT} from './comment-contracts.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists-middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.ICommentService) private readonly commentService: ICommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.read,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(DataCommentDto),
        new DocumentExistsMiddleware(this.commentService, 'Comment', 'offerId')
      ],
    });
  }

  public async read(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const limitParam = request.query?.limit;
    const limit = limitParam ? Number(limitParam) : DEFAULT_COMMENTS_LIMIT;
    const comments = await this.commentService.findByOfferId(offerId, limit);

    if (!comments) {
      return this.noContent(response, []);
    }

    this.ok(response, fillDTO(CommentResponse, comments));
  }

  public async create(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const body: DataCommentDto = request.body;
    const comment = await this.commentService.create({
      offerId,
      ...body,
    });

    this.created(
      response,
      fillDTO(CommentResponse, comment)
    );
  }
}

import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {ICommentService} from './i-comment-service.js';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment-response.js';
import {CreateCommentDto, DataCommentDto} from './dto/comment-dto.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {DEFAULT_COMMENTS_LIMIT} from './comment-contracts.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists-middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-routes-middleware.js';
import {IConfig} from '../../common/config/i-config.js';
import {IOfferService} from '../offer/i-offer-service.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IConfig) configService: IConfig,
    @inject(Component.ICommentService) private readonly commentService: ICommentService,
    @inject(Component.IOfferService) private readonly offerService: IOfferService,
  ) {
    super(logger, configService);

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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(DataCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
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

  public async create(request: Request<{ offerId: string }, object, CreateCommentDto>, response: Response): Promise<void> {
    const offerId = request.params.offerId;

    const comment = await this.offerService.createOfferComment({
      ...request.body,
      author: request.user.id,
      offerId,
    });

    this.created(
      response,
      fillDTO(CommentResponse, comment)
    );
  }
}

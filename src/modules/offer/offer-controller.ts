import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {IOfferService} from './i-offer-service.js';
import {fillDTO} from '../../utils/common.js';
import OfferResponse from './response/offer-response.js';
import {CreateOfferDto, UpdateOfferDto} from './dto/offer-dto.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {DEFAULT_OFFERS_LIMIT} from './offer-contracts.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists-middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-routes-middleware.js';
import {VerifyAuthorMiddleware} from '../../common/middlewares/verify-author-middleware.js';
import {IConfig} from '../../common/config/i-config.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IConfig) configService: IConfig,
    @inject(Component.IOfferService) private readonly offerService: IOfferService,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index,});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.read,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new VerifyAuthorMiddleware(this.offerService, 'Offer', 'offerId', 'author')
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new VerifyAuthorMiddleware(this.offerService, 'Offer', 'offerId', 'author')
      ],
    });
  }

  public async index(request: Request, response: Response): Promise<void> {
    const limitParam = request.query?.limit;
    const limit = limitParam ? Number(limitParam) : DEFAULT_OFFERS_LIMIT;
    const offers = await this.offerService.find(limit);

    if (!offers) {
      return this.noContent(response, []);
    }

    const offersResponse = fillDTO(OfferResponse, offers);

    this.ok(response, offersResponse);
  }

  public async update(
    {body, params}: Request<{ offerId: string }, Record<string, unknown>, UpdateOfferDto>,
    response: Response
  ): Promise<void> {
    const offerId = params.offerId;

    const updatedOffer = await this.offerService.updateById(offerId, body);

    this.ok(response, fillDTO(OfferResponse, updatedOffer));
  }

  public async read(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const offer = await this.offerService.get(offerId);

    this.ok(response, fillDTO(OfferResponse, offer));
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    response: Response
  ): Promise<void> {
    const createdOffer = await this.offerService.create({...body, author: user.id});
    const newOffer = await this.offerService.get(createdOffer.id);

    this.created(response, fillDTO(OfferResponse, newOffer)
    );
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    await this.offerService.deleteById(offerId);

    this.noContent(response, {});
  }
}

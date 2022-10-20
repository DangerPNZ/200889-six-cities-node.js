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
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {DEFAULT_OFFERS_LIMIT} from './offer-contracts.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IOfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.read, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto)]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
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

  public async update(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const updatedOffer = await this.offerService.updateById(offerId, request.body as UpdateOfferDto);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(response, fillDTO(OfferResponse, updatedOffer));
  }

  public async read(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const offer = await this.offerService.getOffer(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(response, fillDTO(OfferResponse, offer));
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, response: Response): Promise<void> {
    const offer = await this.offerService.create(body);

    this.created(
      response,
      fillDTO(OfferResponse, offer)
    );
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const deletedOffer = await this.offerService.deleteById(offerId);

    if (!deletedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.noContent(response, fillDTO(OfferResponse, deletedOffer));
  }
}

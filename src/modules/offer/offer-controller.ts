import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {IOfferService} from './i-offer-service.js';
import {fillDTO} from '../../utils/common.js';
import OfferResponse from './response/offer-response.js';
import {CreateOfferDto} from './dto/offer-dto.js';
import {DEFAULT_OFFERS_LIMIT} from '../../utils/constants.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IOfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.read});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
  }

  public async index(request: Request, response: Response): Promise<void> {
    const size = request.query?.size;
    const limit = size ? Number(size) : DEFAULT_OFFERS_LIMIT;
    const offers = await this.offerService.find(limit);

    if (!offers) {
      return this.noContent(response, null);
    }

    const offersResponse = fillDTO(OfferResponse, offers);

    this.ok(response, offersResponse);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const updatedOffer = await this.offerService.updateById(offerId, request.body);

    if (!updatedOffer) {
      return this.noContent(response, null);
    }

    this.ok(response, fillDTO(OfferResponse, updatedOffer));
  }

  public async read(request: Request, response: Response): Promise<void> {
    const offerId = request.params.offerId;
    const offer = await this.offerService.getOffer(offerId);

    if (!offer) {
      return this.noContent(response, null);
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
      return this.noContent(response, null);
    }

    this.ok(response, fillDTO(OfferResponse, deletedOffer));
  }
}

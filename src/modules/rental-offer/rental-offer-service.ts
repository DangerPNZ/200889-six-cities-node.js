import {IRentalOfferService} from './i-rental-offer-service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {RentalOfferEntity} from './rental-offer-entity.js';
import {types, DocumentType} from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer-dto.js';


@injectable()
export default class RentalOfferService implements IRentalOfferService {
  constructor(
    @inject(Component.ILogger) private readonly logger: ILogger,
    @inject(Component.RentalOfferModel) private readonly rentalOfferModel: types.ModelType<RentalOfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>> {
    const result = await this.rentalOfferModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel.findById(offerId).exec();
  }
}

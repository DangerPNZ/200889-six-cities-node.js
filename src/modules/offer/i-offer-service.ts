import {CreateOfferDto, UpdateOfferDto} from './dto/offer-dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer-entity.js';
import {IDocumentsExists} from '../../common/middlewares/types/i-documents-exists.js';

export interface IOfferService extends IDocumentsExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit: number): Promise<DocumentType<OfferEntity>[]>;
  get(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  setAvgRateAndCommentsCount(offerId: string): Promise<void>;
}

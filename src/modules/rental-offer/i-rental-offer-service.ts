import CreateOfferDto from './dto/create-offer-dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {RentalOfferEntity} from './rental-offer-entity.js';

export interface IRentalOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>>,
  findById(offerId: string): Promise<DocumentType<RentalOfferEntity> | null>,
}

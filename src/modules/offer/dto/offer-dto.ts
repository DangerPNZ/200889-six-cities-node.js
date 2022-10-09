import {City, Facility, OfferType} from '../../../i-offer.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewPhotoUrl!: string;
  public photosUrls!: string[];
  public isPremium!: boolean;
  public offerType!: OfferType;
  public roomsAmount!: number;
  public guestsLimit!: number;
  public price!: number;
  public facilities!: Facility[];
  public author!: string;
  public coordinates!: [number, number];
}

export interface UpdateOfferDto extends Partial<CreateOfferDto> {}

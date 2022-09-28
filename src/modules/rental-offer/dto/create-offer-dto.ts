import {City, Facility, IAuthor, OfferType} from '../../../i-rental-offer.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public previewPhotoUrl!: string;
  public photosUrls!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public offerType!: OfferType;
  public roomsAmount!: number;
  public guestsLimit!: number;
  public price!: number;
  public facilities!: Facility[];
  public author!: IAuthor;
  public commentsAmount!: number;
  public coordinates!: [number, number];
  public userId!: string;
}

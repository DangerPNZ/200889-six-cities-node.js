import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user-response.js';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public previewPhotoUrl!: string;

  @Expose()
  public photosUrls!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating?: number;

  @Expose()
  public offerType!: string;

  @Expose()
  public roomsAmount!: number;

  @Expose()
  public guestsLimit!: number;

  @Expose()
  public price!: number;

  @Expose()
  public facilities!: string[];

  @Expose()
  @Type(() => UserResponse)
  public author!: UserResponse;

  @Expose()
  public commentsCount?: number;

  @Expose()
  public coordinates!: [number, number];
}

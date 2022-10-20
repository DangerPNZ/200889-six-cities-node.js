import typegoose, {defaultClasses, getModelForClass, Ref, Severity} from '@typegoose/typegoose';
import {UserEntity} from '../user/user-entity.js';
import {City, Coordinates, Facility, IOfferEntity, OfferType} from './offer-contracts.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Offers',
  }
})

export class OfferEntity extends defaultClasses.TimeStamps implements IOfferEntity {
  constructor(data: IOfferEntity) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.city = data.city;
    this.previewPhotoUrl = data.previewPhotoUrl;
    this.photosUrls = data.photosUrls;
    this.isPremium = data.isPremium;
    this.offerType = data.offerType;
    this.roomsAmount = data.roomsAmount;
    this.guestsLimit = data.guestsLimit;
    this.price = data.price;
    this.facilities = data.facilities;
    this.coordinates = data.coordinates;
  }

  @prop({
    required: true,
  })
  public title!: string;

  @prop({
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public city!: City;

  @prop({
    required: true,
  })
  public previewPhotoUrl!: string;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW,
  })
  public photosUrls!: string[];

  @prop({
    required: true
  })
  public isPremium!: boolean;

  @prop({
    required: true,
  })
  public offerType!: OfferType;

  @prop({
    required: true,
  })
  public roomsAmount!: number;

  @prop({
    required: true,
  })
  public guestsLimit!: number;

  @prop({
    required: true,
  })
  public price!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW,
  })
  public facilities!: Facility[];

  @prop({
    ref: () => UserEntity,
    required: true,
    _id: false,
  })
  public author!: Ref<UserEntity>;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW,
  })
  public coordinates!: Coordinates;

  @prop({
    required: false,
  })
  public rating?: number;

  @prop({
    required: false,
  })
  public commentsCount?: number;
}

export const OfferModel = getModelForClass(OfferEntity);

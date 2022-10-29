import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user-entity.js';
import {City, Coordinates, Facility, IOfferEntity, OfferType, OfferValidation} from './offer-contracts.js';

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
    type: String,
    trim: true,
    minlength: [
      OfferValidation.Title.MinLength,
      `Minimum title length must be ${OfferValidation.Title.MinLength}`
    ],
    maxlength: [
      OfferValidation.Title.MaxLength,
      `Maximum title length must be ${OfferValidation.Title.MaxLength}`
    ]
  })
  public title!: string;

  @prop({
    required: true,
    type: String,
    trim: true,
    minlength: [
      OfferValidation.Description.MinLength,
      `Minimum description length must be ${OfferValidation.Description.MinLength}`
    ],
    maxlength: [
      OfferValidation.Description.MaxLength,
      `Maximum description length must be ${OfferValidation.Description.MaxLength}`
    ]
  })
  public description!: string;

  @prop({
    required: true,
  })
  public city!: City;

  @prop({
    required: true,
    type: String,
    trim: true,
  })
  public previewPhotoUrl!: string;

  @prop({
    required: true,
    type: String,
  })
  public photosUrls!: string[];

  @prop({
    required: true,
    type: Boolean,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    type: Number,
    min: [
      OfferValidation.RoomsAmount.Min,
      `Minimum roomsAmount value must be ${OfferValidation.RoomsAmount.Min}`
    ],
    max: [
      OfferValidation.RoomsAmount.Max,
      `Maximum roomsAmount value must be ${OfferValidation.RoomsAmount.Max}`
    ],
  })
  public roomsAmount!: number;

  @prop({
    required: true,
    type: Number,
    min: [
      OfferValidation.GuestLimit.Min,
      `Minimum guestsLimit value must be ${OfferValidation.GuestLimit.Min}`
    ],
    max: [
      OfferValidation.GuestLimit.Max,
      `Maximum guestsLimit value must be ${OfferValidation.GuestLimit.Max}`
    ],
  })
  public guestsLimit!: number;

  @prop({
    required: true,
    type: Number,
    min: [
      OfferValidation.Price.Min,
      `Minimum price value must be ${OfferValidation.Price.Min}`
    ],
    max: [
      OfferValidation.Price.Max,
      `Maximum price value must be ${OfferValidation.Price.Max}`
    ],
  })
  public price!: number;

  @prop({
    required: true,
    type: String,
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
    type: Number,
  })
  public coordinates!: Coordinates;

  @prop({
    required: false,
    type: Number,
  })
  public rating?: number;

  @prop({
    required: false,
    type: Number,
  })
  public commentsCount?: number;
}

export const OfferModel = getModelForClass(OfferEntity);

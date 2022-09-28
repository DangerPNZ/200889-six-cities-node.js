import typegoose, {defaultClasses, getModelForClass, Ref, Severity} from '@typegoose/typegoose';
import {City, Coordinate, Facility, IRentalOffer, OfferType} from '../../i-rental-offer.js';
// import {
// MAX_FACILITIES_AMOUNT,
// MAX_GUESTS_LIMIT,
// MAX_OFFER_DESCRIPTION_LENGTH,
// MAX_OFFER_TITLE_LENGTH,
// MAX_PRICE,
// MAX_RATING,
// MAX_ROOMS_AMOUNT,
// MIN_FACILITIES_AMOUNT,
// MIN_GUESTS_LIMIT,
// MIN_OFFER_DESCRIPTION_LENGTH,
// MIN_OFFER_TITLE_LENGTH,
// MIN_PRICE,
// MIN_RATING,
// MIN_ROOMS_AMOUNT,
// PUBLICATION_PHOTOS_AMOUNT
//} from '../../utils/constants.js';
// import {
//   AMSTERDAM_COORDINATES,
//   BRUSSELS_COORDINATES,
//   COLOGNE_COORDINATES,
//   DUSSELDORF_COORDINATES,
//   HAMBURG_COORDINATES,
//   PARIS_COORDINATES
// } from '../../utils/coordinates-constants.js';
import {UserEntity} from '../user/user-entity.js';

const {prop, modelOptions} = typegoose;

// TODO: Разобраться с подходом к валидации
export interface RentalOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Offers',
  }
})

export class RentalOfferEntity extends defaultClasses.TimeStamps implements Omit<IRentalOffer, 'commentsAmount' | 'author'> {
  constructor(data: IRentalOffer) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.publicationDate = data.publicationDate;
    this.city = data.city;
    this.previewPhotoUrl = data.previewPhotoUrl;
    this.photosUrls = data.photosUrls;
    this.isPremium = data.isPremium;
    this.rating = data.rating;
    this.offerType = data.offerType;
    this.roomsAmount = data.roomsAmount;
    this.guestsLimit = data.guestsLimit;
    this.price = data.price;
    this.facilities = data.facilities;
    this.coordinates = data.coordinates;
  }

  @prop({
    required: true,
    // minlength: [MIN_OFFER_TITLE_LENGTH, `Min length for title is ${MIN_OFFER_TITLE_LENGTH}`],
    // maxlength: [MAX_OFFER_TITLE_LENGTH, `Max length for title is ${MAX_OFFER_TITLE_LENGTH}`],
  })
  public title!: string;

  @prop({
    required: true,
    // minlength: [MIN_OFFER_DESCRIPTION_LENGTH, `Min length for description is ${MIN_OFFER_DESCRIPTION_LENGTH}`],
    // maxlength: [MAX_OFFER_DESCRIPTION_LENGTH, `Max length for description is ${MAX_OFFER_DESCRIPTION_LENGTH}`],
  })
  public description!: string;

  @prop({
    required: true,
  })
  public publicationDate!: Date;

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
    // length: PUBLICATION_PHOTOS_AMOUNT,
    allowMixed: Severity.ALLOW,
  })
  public photosUrls!: string[];

  @prop({
    required: true
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    // min: MIN_RATING,
    // max: MAX_RATING,
  })
  public rating!: number; // TODO: от 1 до 5, в т.ч. float

  @prop({
    required: true,
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    // min: MIN_ROOMS_AMOUNT,
    // max: MAX_ROOMS_AMOUNT,
  })
  public roomsAmount!: number;

  @prop({
    required: true,
    // min: MIN_GUESTS_LIMIT,
    // max: MAX_GUESTS_LIMIT,
  })
  public guestsLimit!: number;

  @prop({
    required: true,
    // min: MIN_PRICE,
    // max: MAX_PRICE,
  })
  public price!: number;

  @prop({
    required: true,
    // minlength: MIN_FACILITIES_AMOUNT,
    // maxlength: MAX_FACILITIES_AMOUNT,
    allowMixed: Severity.ALLOW,
  })
  public facilities!: Facility[];

  @prop({
    ref: () => UserEntity,
    required: true,
    _id: false,
  })
  public author!: Ref<Omit<UserEntity, 'password'>>;

  @prop({
    required: true,
    // match: [
    //   PARIS_COORDINATES ||
    //   COLOGNE_COORDINATES ||
    //   BRUSSELS_COORDINATES ||
    //   AMSTERDAM_COORDINATES ||
    //   HAMBURG_COORDINATES ||
    //   DUSSELDORF_COORDINATES,
    //   'invalid coordinates'],
    allowMixed: Severity.ALLOW,
  })
  public coordinates!: Coordinate;
}

export const RentalOfferModel = getModelForClass(RentalOfferEntity);

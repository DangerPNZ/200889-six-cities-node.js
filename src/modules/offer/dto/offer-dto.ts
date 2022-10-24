import {
  MinLength,
  MaxLength,
  Min,
  Max,
  IsEnum,
  IsInt,
  IsBoolean,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique
} from 'class-validator';
import {City, Facility, OfferType, OfferValidation} from '../offer-contracts.js';
import {IsIncorrectCoordinates} from '../is-incorrect-coordinates.js';

export class CreateOfferDto {
  @IsString({message: 'title value must be string'})
  @MinLength(
    OfferValidation.Title.MinLength,
    {message: `Minimum title length must be ${OfferValidation.Title.MinLength}`}
  )
  @MaxLength(
    OfferValidation.Title.MaxLength,
    {message: `Maximum title length must be ${OfferValidation.Title.MaxLength}`}
  )
  public title!: string;

  @IsString({message: 'description value must be string'})
  @MinLength(
    OfferValidation.Description.MinLength,
    {message: `Minimum description length must be ${OfferValidation.Description.MinLength}`}
  )
  @MaxLength(
    OfferValidation.Description.MaxLength,
    {message: `Maximum description length must be ${OfferValidation.Description.MaxLength}`}
  )
  public description!: string;

  @IsEnum(
    City,
    {
      message: `city value must be ${City.Paris}, ${City.Cologne}, ${City.Brussels}, ${City.Amsterdam}, ${City.Hamburg} or ${City.Dusseldorf}`
    }
  )
  public city!: City;

  @IsString({message: 'previewPhotoUrl value must be string'})
  public previewPhotoUrl!: string;

  @IsArray({message: 'photosUrls must be an array'})
  @ArrayMinSize(
    OfferValidation.PublicationPhotosAmount,
    {message: `photosUrls array length must be ${OfferValidation.PublicationPhotosAmount}`}
  )
  @ArrayMaxSize(
    OfferValidation.PublicationPhotosAmount,
    {message: `photosUrls array length must be ${OfferValidation.PublicationPhotosAmount}`}
  )
  @IsString({each: true, message: 'photosUrls value must be string'})
  @ArrayUnique({message: 'photosUrls must consist of unique values'})
  public photosUrls!: string[];

  @IsBoolean({message: 'isPremium value must be true or false'})
  public isPremium!: boolean;

  @IsEnum(
    OfferType, {
      message: `offerType value must be ${OfferType.Apartment}, ${OfferType.House}, ${OfferType.Room} or ${OfferType.Hotel}`
    }
  )
  public offerType!: OfferType;

  @IsInt({message: 'roomsAmount must be an integer'})
  @Min(
    OfferValidation.RoomsAmount.Min,
    {message: `Minimum roomsAmount value must be ${OfferValidation.RoomsAmount.Min}`}
  )
  @Max(
    OfferValidation.RoomsAmount.Max,
    {message: `Maximum roomsAmount value must be ${OfferValidation.RoomsAmount.Max}`}
  )
  public roomsAmount!: number;

  @IsInt({message: 'guestsLimit must be an integer'})
  @Min(
    OfferValidation.GuestLimit.Min,
    {message: `Minimum guestsLimit value must be ${OfferValidation.GuestLimit.Min}`}
  )
  @Max(
    OfferValidation.GuestLimit.Max,
    {message: `Maximum guestsLimit value must be ${OfferValidation.GuestLimit.Max}`}
  )
  public guestsLimit!: number;

  @IsInt({message: 'price must be an integer'})
  @Min(
    OfferValidation.Price.Min,
    {message: `Minimum price value must be ${OfferValidation.Price.Min}`}
  )
  @Max(
    OfferValidation.Price.Max,
    {message: `Maximum price value must be ${OfferValidation.Price.Max}`}
  )
  public price!: number;

  @IsArray({message: 'facilities must be an array'})
  @ArrayMinSize(OfferValidation.FacilitiesAmount.Min, {message: `facilities array myst contains at least ${OfferValidation.FacilitiesAmount.Min} element`})
  @ArrayMaxSize(OfferValidation.FacilitiesAmount.Max, {message: `facilities array can contain maximum ${OfferValidation.FacilitiesAmount.Max} elements`})
  @IsEnum(
    Facility,
    {
      each: true,
      message:
        `facilities values myst be ${Facility.Breakfast}, ${Facility.AirConditioning}, ${Facility.LaptopFriendlyWorkspace}, ${Facility.BabySeat}, ${Facility.Washer}, ${Facility.Towels} or ${Facility.Fridge}`
    })
  @ArrayUnique({message: 'facilities must consist of unique values'})
  public facilities!: Facility[];

  public author!: string;

  @IsArray({message: 'coordinates must be an array'})

  /** Павел, проверь, пожалуйста корректность этого валидатора */
  @IsIncorrectCoordinates('city', {message: 'coordinates has incorrect value for city'})
  public coordinates!: [number, number];
}

export class UpdateOfferDto implements Partial<CreateOfferDto> {}

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
  ArrayUnique, IsOptional, IsDefined
} from 'class-validator';
import {City, Facility, OfferType, OfferValidation} from '../offer-contracts.js';
import {IsIncorrectCoordinates} from '../is-incorrect-coordinates.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: 'title value must be string'})
  @MinLength(
    OfferValidation.Title.MinLength,
    {message: `Minimum title length must be ${OfferValidation.Title.MinLength}`}
  )
  @MaxLength(
    OfferValidation.Title.MaxLength,
    {message: `Maximum title length must be ${OfferValidation.Title.MaxLength}`}
  )
  public title?: string;

  @IsOptional()
  @IsString({message: 'description value must be string'})
  @MinLength(
    OfferValidation.Description.MinLength,
    {message: `Minimum description length must be ${OfferValidation.Description.MinLength}`}
  )
  @MaxLength(
    OfferValidation.Description.MaxLength,
    {message: `Maximum description length must be ${OfferValidation.Description.MaxLength}`}
  )
  public description?: string;

  @IsOptional()
  @IsEnum(
    City,
    {
      message: `city value must be ${City.Paris}, ${City.Cologne}, ${City.Brussels}, ${City.Amsterdam}, ${City.Hamburg} or ${City.Dusseldorf}`
    }
  )
  public city?: City;

  @IsOptional()
  @IsString({message: 'previewPhotoUrl value must be string'})
  public previewPhotoUrl?: string;

  @IsOptional()
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
  public photosUrls?: string[];

  @IsOptional()
  @IsBoolean({message: 'isPremium value must be true or false'})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(
    OfferType, {
      message: `offerType value must be ${OfferType.Apartment}, ${OfferType.House}, ${OfferType.Room} or ${OfferType.Hotel}`
    }
  )
  public offerType?: OfferType;

  @IsOptional()
  @IsInt({message: 'roomsAmount must be an integer'})
  @Min(
    OfferValidation.RoomsAmount.Min,
    {message: `Minimum roomsAmount value must be ${OfferValidation.RoomsAmount.Min}`}
  )
  @Max(
    OfferValidation.RoomsAmount.Max,
    {message: `Maximum roomsAmount value must be ${OfferValidation.RoomsAmount.Max}`}
  )
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: 'guestsLimit must be an integer'})
  @Min(
    OfferValidation.GuestLimit.Min,
    {message: `Minimum guestsLimit value must be ${OfferValidation.GuestLimit.Min}`}
  )
  @Max(
    OfferValidation.GuestLimit.Max,
    {message: `Maximum guestsLimit value must be ${OfferValidation.GuestLimit.Max}`}
  )
  public guestsLimit?: number;

  @IsOptional()
  @IsInt({message: 'price must be an integer'})
  @Min(
    OfferValidation.Price.Min,
    {message: `Minimum price value must be ${OfferValidation.Price.Min}`}
  )
  @Max(
    OfferValidation.Price.Max,
    {message: `Maximum price value must be ${OfferValidation.Price.Max}`}
  )
  public price?: number;

  @IsOptional()
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
  public facilities?: Facility[];

  public author?: string;

  @IsOptional()
  @IsArray({message: 'coordinates must be an array'})
  @IsIncorrectCoordinates('city', {message: 'coordinates has incorrect value for city'})
  public coordinates?: [number, number];
}

export class CreateOfferDto extends UpdateOfferDto {
  @IsDefined()
  public title!: string;

  @IsDefined()
  public description!: string;

  @IsDefined()
  public city!: City;

  @IsDefined()
  public previewPhotoUrl!: string;

  @IsDefined()
  public photosUrls!: string[];

  @IsDefined()
  public isPremium!: boolean;

  @IsDefined()
  public offerType!: OfferType;

  @IsDefined()
  public roomsAmount!: number;

  @IsDefined()
  public guestsLimit!: number;

  @IsDefined()
  public price!: number;

  @IsDefined()
  public facilities!: Facility[];

  public author!: string;

  @IsDefined()
  public coordinates!: [number, number];
}

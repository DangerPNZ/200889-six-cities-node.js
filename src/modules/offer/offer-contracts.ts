import {IAuthor} from '../user/user-contracts.js';

export const RATING_NUM_AFTER_DIGIT = 1;
export const DEFAULT_OFFERS_LIMIT = 60;

export const OfferValidation = {
  Title: {
    MinLength: 10,
    MaxLength: 100,
  },
  Description: {
    MinLength: 20,
    MaxLength: 1024,
  },
  PublicationPhotosAmount: 6,
  RoomsAmount: {
    Min: 1,
    Max: 8,
  },
  GuestLimit: {
    Min: 1,
    Max: 10,
  },
  Price: {
    Min: 100,
    Max: 100000,
  },
  FacilitiesAmount: {
    Min: 1,
    Max: 7,
  },
  EmailMatchRegex: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/
} as const;

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export enum Facility {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export const CityCoordinatesValue = {
  Paris: [48.85661, 2.351499],
  Cologne: [50.938361, 6.959974],
  Brussels: [50.846557, 4.351697],
  Amsterdam: [52.370216, 4.895168],
  Hamburg: [53.550341, 10.000654],
  Dusseldorf: [51.225402, 6.776314]
} as const;

export type Coordinates = [number, number];

export interface IOffer {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewPhotoUrl: string;
  photosUrls: string[];
  isPremium: boolean;
  rating: number;
  offerType: OfferType;
  roomsAmount: number;
  guestsLimit: number;
  price: number;
  facilities: Facility[];
  author: IAuthor;
  commentsAmount: number;
  coordinates: Coordinates;
}

export interface IOfferEntity extends Omit<IOffer, 'publicationDate' | 'author' | 'commentsAmount' | 'rating'> {}

export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}
export enum OfferType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel',
}
export enum UserType {
  ORDINARY = 'обычный',
  PRO = 'pro',
}

export type Coordinate = [number, number];

export enum Facility {
  BREAKFAST = 'Breakfast',
  AIR_CONDITIONING = 'Air conditioning',
  LAPTOP_FRIENDLY_WORKSPACE = 'Laptop friendly workspace',
  BABY_SEAT = 'Baby seat',
  WASHER = 'Washer',
  TOWELS = 'Towels',
  FRIDGE = 'Fridge'
}

export interface IAuthor {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  userType: UserType;
}

export interface IComment {
  text: string;
  publicationDate: Date;
  rating: number;
  author: IAuthor;
}

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
  coordinates: [number, number];
}

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
export enum UserType {
  Ordinary = 'обычный',
  Pro = 'pro',
}

export type Coordinate = [number, number];

export enum Facility {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
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

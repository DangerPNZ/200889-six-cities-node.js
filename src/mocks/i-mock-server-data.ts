import {City, Coordinate, OfferType, UserType} from '../i-rental-offer.js';

export interface IMockServerData {
  titles: string[],
  descriptions: string[],
  cities: City[],
  previewPhotoUrls: string[],
  photosUrls: string[][],
  isPremiumValues: [true, false],
  offerTypes: OfferType[],
  authorNames: string[],
  emails: string[],
  avatars: Array<string>,
  passwords: string[],
  userTypes: UserType[],
  coordinates: Coordinate[],
}

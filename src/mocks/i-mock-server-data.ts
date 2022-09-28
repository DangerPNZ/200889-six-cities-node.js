import {City, Coordinate, Facility, OfferType, UserType} from '../i-rental-offer.js';

export interface IMockServerData {
  titles: string[],
  descriptions: string[],
  cities: City[],
  previewPhotoUrls: string[],
  photosUrls: string[][],
  isPremiumValues: [true, false],
  offerTypes: OfferType[],
  facilities: Facility[][],
  authorNames: string[],
  emails: string[],
  avatars: string[],
  passwords: string[],
  userTypes: UserType[],
  coordinates: Coordinate[],
}

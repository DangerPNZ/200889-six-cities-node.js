import {City, Coordinates, Facility, OfferType} from '../modules/offer/offer-contracts.js';
import {UserType} from '../modules/user/user-contracts.js';

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
  coordinates: Coordinates[],
}

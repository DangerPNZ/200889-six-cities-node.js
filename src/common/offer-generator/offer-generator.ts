import {IOfferGenerator} from './i-offer-generator.js';
import {IMockServerData} from '../../mocks/i-mock-server-data.js';
import {generateRandomNumber, getRandomItem, getRandomUniqueItemsByAmount} from '../../utils/random.js';
import {Coordinates, OfferValidation} from '../../modules/offer/offer-contracts.js';

const CITIES_AMOUNT = 6;
const DEFAULT_USER_PASSWORD = '1234567890';

export class OfferGenerator implements IOfferGenerator {
  constructor(private readonly mockServerData: IMockServerData) {}

  public generate(): string {
    const randomIndexForCity = generateRandomNumber(0, CITIES_AMOUNT - 1);

    const title = getRandomItem<string>(this.mockServerData.titles);
    const description = getRandomItem<string>(this.mockServerData.descriptions);
    const city = <string>this.mockServerData.cities[randomIndexForCity];
    const previewPhotoUrl = getRandomItem<string>(this.mockServerData.previewPhotoUrls);
    const photosUrls = getRandomUniqueItemsByAmount<string[]>(this.mockServerData.photosUrls, OfferValidation.PublicationPhotosAmount);
    const isPremium = getRandomItem<boolean>(this.mockServerData.isPremiumValues);
    const offerType = getRandomItem<string>(this.mockServerData.offerTypes);
    const roomsAmount = generateRandomNumber(OfferValidation.RoomsAmount.Min, OfferValidation.RoomsAmount.Max);
    const guestsLimit = generateRandomNumber(OfferValidation.GuestLimit.Min, OfferValidation.GuestLimit.Max);
    const price = generateRandomNumber(OfferValidation.Price.Min, OfferValidation.Price.Max);
    const facilities = getRandomUniqueItemsByAmount<string[]>(this.mockServerData.facilities, generateRandomNumber(OfferValidation.FacilitiesAmount.Min, OfferValidation.FacilitiesAmount.Max));
    const coordinates: Coordinates = this.mockServerData.coordinates[randomIndexForCity];
    const email = getRandomItem<string>(this.mockServerData.emails);
    const password = DEFAULT_USER_PASSWORD;
    const name = getRandomItem<string>(this.mockServerData.names);
    const userType = getRandomItem<string>(this.mockServerData.userTypes);

    return [title, description, city, previewPhotoUrl, photosUrls, isPremium, offerType, roomsAmount, guestsLimit, price, facilities, coordinates, email, password, name, userType].join('\t');
  }
}

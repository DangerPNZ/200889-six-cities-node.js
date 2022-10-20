import {IRentalOfferGenerator} from './i-rental-offer-generator.js';
import {IMockServerData} from '../../mocks/i-mock-server-data.js';
import {generateRandomNumber, getRandomItem, getRandomUniqueItemsByAmount} from '../../utils/random.js';
import dayjs from 'dayjs';
import {Coordinates, OfferValidation, RATING_NUM_AFTER_DIGIT} from '../../modules/offer/offer-contracts.js';
import {CommentValidation} from '../../modules/comment/comment-contracts.js';

const CITIES_AMOUNT = 6;

enum WeekDayNumber {
  First = 1,
  Last = 7
}
enum CommentCountValue {
  Min = 1,
  Max = 50,
}

export class RentalOfferGenerator implements IRentalOfferGenerator{
  constructor(private readonly mockServerData: IMockServerData) {}

  public generate(): string {
    const randomIndexForCity = generateRandomNumber(0, CITIES_AMOUNT - 1);

    const title = getRandomItem<string>(this.mockServerData.titles);
    const description = getRandomItem<string>(this.mockServerData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomNumber(WeekDayNumber.First, WeekDayNumber.Last), 'day').toISOString();
    const city = <string>this.mockServerData.cities[randomIndexForCity];
    const previewPhotoUrl = getRandomItem<string>(this.mockServerData.previewPhotoUrls);
    const photosUrls = getRandomUniqueItemsByAmount<string[]>(this.mockServerData.photosUrls, OfferValidation.PublicationPhotosAmount);
    const isPremium = getRandomItem<boolean>(this.mockServerData.isPremiumValues);
    const rating = generateRandomNumber(CommentValidation.Rating.Min, CommentValidation.Rating.Max, generateRandomNumber(0, RATING_NUM_AFTER_DIGIT));
    const offerType = getRandomItem<string>(this.mockServerData.offerTypes);
    const roomsAmount = generateRandomNumber(OfferValidation.RoomsAmount.Min, OfferValidation.RoomsAmount.Max);
    const guestsLimit = generateRandomNumber(OfferValidation.GuestLimit.Min, OfferValidation.GuestLimit.Max);
    const price = generateRandomNumber(OfferValidation.Price.Min, OfferValidation.Price.Max);
    const facilities = getRandomUniqueItemsByAmount<string[]>(this.mockServerData.facilities, generateRandomNumber(OfferValidation.FacilitiesAmount.Min, OfferValidation.FacilitiesAmount.Max));
    const authorName = getRandomItem<string>(this.mockServerData.authorNames);
    const emails = getRandomItem<string>(this.mockServerData.emails);
    const avatarUrl = getRandomItem<string>(this.mockServerData.avatars);
    const password = getRandomItem<string>(this.mockServerData.passwords);
    const userType = getRandomItem<string>(this.mockServerData.userTypes);
    const commentsCount = generateRandomNumber(CommentCountValue.Min, CommentCountValue.Max);
    const coordinates: Coordinates = this.mockServerData.coordinates[randomIndexForCity];

    return [title, description, publicationDate, city, previewPhotoUrl, photosUrls, isPremium, rating, offerType, roomsAmount, guestsLimit, price, facilities, authorName, emails, avatarUrl, password, userType, commentsCount, coordinates].join('\t');
  }
}

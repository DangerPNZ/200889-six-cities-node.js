import {IRentalOfferGenerator} from './i-rental-offer-generator.js';
import {IMockServerData} from '../../mocks/i-mock-server-data.js';
import {
  generateRandomNumber, getRandomItem,
  getRandomUniqueItemsByAmount,
} from '../../utils/random.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const CITIES_AMOUNT = 6;
const PUBLICATION_PHOTOS_AMOUNT = 6;

export class RentalOfferGenerator implements IRentalOfferGenerator{
  constructor(private readonly mockServerData: IMockServerData) {}

  public generate(): string {
    const randomIndexForCity = generateRandomNumber(0, CITIES_AMOUNT - 1);

    const title = getRandomItem<string>(this.mockServerData.titles);
    const description = getRandomItem<string>(this.mockServerData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = <string>this.mockServerData.cities[randomIndexForCity];
    const previewPhotoUrl = getRandomItem<string>(this.mockServerData.previewPhotoUrls);
    const photosUrls = getRandomUniqueItemsByAmount<string[]>(this.mockServerData.photosUrls, PUBLICATION_PHOTOS_AMOUNT);
    const isPremium = getRandomItem<boolean>(this.mockServerData.isPremiumValues);
    const rating = generateRandomNumber(1, 5, 1);
    const offerType = getRandomItem<string>(this.mockServerData.offerTypes);
    const roomsAmount = generateRandomNumber(1, 8);
    const guestsLimit = generateRandomNumber(1, 10);
    const price = generateRandomNumber(100, 100000);
    const authorName = getRandomItem<string>(this.mockServerData.authorNames);
    const emails = getRandomItem<string>(this.mockServerData.emails);
    const avatarUrl = getRandomItem<string>(this.mockServerData.avatars);
    const password = getRandomItem<string>(this.mockServerData.passwords);
    const userType = getRandomItem<string>(this.mockServerData.userTypes);
    const commentsAmount = generateRandomNumber(0, 50);
    const coordinates: [number, number] = this.mockServerData.coordinates[randomIndexForCity];

    return [title, description, publicationDate, city, previewPhotoUrl, photosUrls, isPremium, rating, offerType, roomsAmount, guestsLimit, price, authorName, emails, avatarUrl, password, userType, commentsAmount, coordinates].join('\t');
  }

}

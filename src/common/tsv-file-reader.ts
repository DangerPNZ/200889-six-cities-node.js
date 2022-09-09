import {IFileReader} from './i-file-reader.js';
import {readFileSync} from 'fs';
import {City, IRentalOffer, OfferType, UserType} from '../i-rental-offer.js';

export default class TsvFileReader implements IFileReader {
  private rawData = '';

  constructor(public fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf8' });
  }

  public toArray(): IRentalOffer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      // TODO Разобраться, почему табы не находятся через '\t'. Возможно настройки редактора (например, подставляет 2 пробела)
      .map((line) => line.split('  '))
      .map(([title, description, publicationDate, city, previewPhotoUrl, photosUrls, isPremium, rating, offerType, roomsAmount, guestsLimit, price, name, email, avatarUrl, password, userType, commentsAmount, coordinates]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        city: city as City,
        previewPhotoUrl,
        photosUrls: photosUrls.split(';'),
        isPremium: Boolean(isPremium),
        rating: Number(rating),
        offerType: offerType as OfferType,
        roomsAmount: Number.parseInt(roomsAmount, 10),
        guestsLimit: Number.parseInt(guestsLimit, 10),
        price: Number.parseInt(price, 10),
        author: {
          name,
          email,
          avatarUrl,
          password,
          userType: userType as UserType,
        },
        commentsAmount: Number.parseInt(commentsAmount, 10),
        coordinates: coordinates.split(';').map((unit) => Number(unit)) as [number, number],
      }));
  }
}

import crypto from 'crypto';
import {City, Facility, IOffer, OfferType, UserType} from '../i-offer.js';
import {plainToInstance, ClassConstructor} from 'class-transformer';

export const createRentalOffer = (row: string): IOffer => {
  const units = row.replace('\n', '').split('\t');
  const [title, description, publicationDate, city, previewPhotoUrl, photosUrls, isPremium, rating, offerType, roomsAmount, guestsLimit, price, facilities, name, email, avatarUrl, password, userType, commentsAmount, coordinates] = units;

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: city as City,
    previewPhotoUrl,
    photosUrls: photosUrls.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    offerType: offerType as OfferType,
    roomsAmount: Number(roomsAmount),
    guestsLimit: Number(guestsLimit),
    price: Number(price),
    facilities: facilities.split(';') as Facility[],
    author: {
      name,
      email,
      avatarUrl,
      password,
      userType: userType as UserType,
    },
    commentsAmount: Number(commentsAmount),
    coordinates: coordinates.split(';').map((unit: string) => Number(unit)) as [number, number],
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const formatRatingValue = (rating: number) => Number.isInteger(rating) ? rating : rating.toFixed(1);

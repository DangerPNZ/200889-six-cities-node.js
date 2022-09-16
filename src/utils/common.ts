import {City, IRentalOffer, OfferType, UserType} from '../i-rental-offer.js';

export const createRentalOffer = (row: string): IRentalOffer => {
  const units = row.replace('\n', '').split('\t');
  const [title, description, publicationDate, city, previewPhotoUrl, photosUrls, isPremium, rating, offerType, roomsAmount, guestsLimit, price, name, email, avatarUrl, password, userType, commentsAmount, coordinates] = units;

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

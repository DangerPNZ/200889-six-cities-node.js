export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}
export enum OfferType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel',
}
export enum UserType {
  ORDINARY = 'обычный',
  PRO = 'pro',
}

export type Coordinate = [number, number];
// const PARIS_COORDINATES: Readonly<Coordinate> = [48.85661, 2.351499];
// const COLOGNE_COORDINATES: Readonly<Coordinate> = [50.938361, 6.959974];
// const BRUSSELS_COORDINATES: Readonly<Coordinate> = [50.846557, 4.351697];
// const AMSTERDAM_COORDINATES: Readonly<Coordinate> = [52.370216, 4.895168];
// const HAMBURG_COORDINATES: Readonly<Coordinate> = [53.550341, 10.000654];
// const DUSSELDORF_COORDINATES: Readonly<Coordinate> = [51.225402, 6.776314];
//
// const defaultAvatarImageUrl = 'https://default.avatar.jpg'; // TODO: url

interface Author {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string; // ??? TODO: Не забыть переделать под критерий
  userType: UserType;
}
/*
 3.1.2. В приложении не может быть двух пользователей с одинаковым email.
 3.1.3. Изображение для аватарки. Необязательное. Если пользователь не загрузил аватар,
 сервис возвращает изображение аватарки по умолчанию. Выбор изображения по умолчанию остаётся на усмотрение студента.
*  */
export interface IRentalOffer {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewPhotoUrl: string;
  photosUrls: string[]; // 6
  isPremium: boolean;
  rating: number; // от 1 до 5, в т.ч. float
  offerType: OfferType;
  roomsAmount: number; // 1 - 8
  guestsLimit: number; // 1 - 10
  price: number; // 100 - 100 000
  author: Author;
  commentsAmount: number;
  coordinates: [number, number];
}

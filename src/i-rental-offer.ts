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

// const PARIS_COORDINATES: Readonly<Array <number>> = [48.85661, 2.351499];
// const COLOGNE_COORDINATES: Readonly<Array <number>> = [50.938361, 6.959974];
// const BRUSSELS_COORDINATES: Readonly<Array <number>> = [50.846557, 4.351697];
// const AMSTERDAM_COORDINATES: Readonly<Array <number>> = [52.370216, 4.895168];
// const HAMBURG_COORDINATES: Readonly<Array <number>> = [53.550341, 10.000654];
// const DUSSELDORF_COORDINATES: Readonly<Array <number>> = [51.225402, 6.776314];
//
//
// const defaultAvatarImageUrl = ''; // TODO: url

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
  offerType: OfferType; // 1 - 8
  roomsAmount: number; // 1 - 10
  guestsLimit: number;
  price: number; // 100 - 100 000
  author: Author;
  commentsAmount: number;
  coordinates: [number, number];
}

import crypto from 'crypto';
import {plainToInstance, ClassConstructor} from 'class-transformer';
import {City, Facility, OfferType, RATING_NUM_AFTER_DIGIT} from '../modules/offer/offer-contracts.js';
import * as jose from 'jose';
import {ValidationError} from 'class-validator';
import {IValidationErrorField} from '../types/i-validation-error-field.js';
import {ServiceError} from '../types/service-error.js';
import {UnknownObject} from '../types/unknown-object.js';
import {DEFAULT_STATIC_IMAGES} from '../app/constants.js';
import {IGenerateOfferData} from '../app/cli-application/cli-commands/contracts.js';
import {UserType} from '../modules/user/user-contracts.js';

const JWT_EXPIRATION_TIME = '2d';

export const createOffer = (row: string): IGenerateOfferData => {
  const units = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    city,
    previewPhotoUrl,
    photosUrls,
    isPremium,
    offerType,
    roomsAmount,
    guestsLimit,
    price,
    facilities,
    coordinates,
    email,
    password,
    fullName,
    userType
  ] = units;

  return {
    offer: {
      title,
      description,
      city: city as City,
      previewPhotoUrl,
      photosUrls: photosUrls.split(';'),
      isPremium: Boolean(isPremium),
      offerType: offerType as OfferType,
      roomsAmount: Number(roomsAmount),
      guestsLimit: Number(guestsLimit),
      price: Number(price),
      facilities: facilities.split(';') as Facility[],
      coordinates: coordinates.split(';').map((unit: string) => Number(unit)) as [number, number],
    },
    user: {
      email,
      password,
      fullName,
      userType: userType as UserType,
    },
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

export const createErrorObject = (serviceError: ServiceError, message: string, details: IValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const formatRatingValue = (rating: number) => Number.isInteger(rating) ? rating : rating.toFixed(RATING_NUM_AFTER_DIGIT);

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));


export const transformErrors = (errors: ValidationError[]): IValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import {City, CityCoordinatesValue} from './offer-contracts.js';
import {CreateOfferDto} from './dto/offer-dto.js';

export function IsIncorrectCoordinates(property: string, validationOptions?: ValidationOptions) {
  return function (object: CreateOfferDto, propertyName: string) {
    registerDecorator({
      name: 'IsIncorrectCoordinates',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: [number, number], args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as {[key: string]: unknown})[relatedPropertyName];
          return relatedValue === City.Paris && String(value) === String(CityCoordinatesValue.Paris) ||
            relatedValue === City.Cologne && String(value) === String(CityCoordinatesValue.Cologne) ||
            relatedValue === City.Brussels && String(value) === String(CityCoordinatesValue.Brussels) ||
            relatedValue === City.Amsterdam && String(value) === String(CityCoordinatesValue.Amsterdam) ||
            relatedValue === City.Hamburg && String(value) === String(CityCoordinatesValue.Hamburg) ||
            relatedValue === City.Dusseldorf && String(value) === String(CityCoordinatesValue.Dusseldorf);
        },
      },
    });
  };
}

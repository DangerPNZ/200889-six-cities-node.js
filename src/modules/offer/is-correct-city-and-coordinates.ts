import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import {City, CityCoordinatesValue} from './offer-contracts.js';
import {CreateOfferDto, UpdateOfferDto} from './dto/offer-dto.js';

export enum ValidateProp {
  CityField = 'CityField',
  CoordinateField = 'CoordinateField'
}

export function IsCorrectCityAndCoordinates(property: string, propType: ValidateProp, validationOptions?: ValidationOptions) {
  return function (object: CreateOfferDto | UpdateOfferDto, propertyName: string) {
    registerDecorator({
      name: 'IsIncorrectCoordinates',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | [number, number], args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as {[key: string]: unknown})[relatedPropertyName];
          return (propType === ValidateProp.CityField ? value : relatedValue) === City.Paris &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Paris) ||
            (propType === ValidateProp.CityField ? value : relatedValue) === City.Cologne &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Cologne) ||
            (propType === ValidateProp.CityField ? value : relatedValue) === City.Brussels &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Brussels) ||
            (propType === ValidateProp.CityField ? value : relatedValue) === City.Amsterdam &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Amsterdam) ||
            (propType === ValidateProp.CityField ? value : relatedValue) === City.Hamburg &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Hamburg) ||
            (propType === ValidateProp.CityField ? value : relatedValue) === City.Dusseldorf &&
            String((propType === ValidateProp.CityField ? relatedValue : value)) === String(CityCoordinatesValue.Dusseldorf);
        },
      },
    });
  };
}

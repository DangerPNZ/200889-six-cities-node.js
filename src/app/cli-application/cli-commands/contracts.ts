import {CreateOfferDto} from '../../../modules/offer/dto/offer-dto.js';
import {CreateUserDto} from '../../../modules/user/dto/user-dto.js';

export enum Command {
  Help = '--help',
  Version = '--version',
  Import = '--import',
  Generate = '--generate'
}

export interface IGenerateOfferData {
  offer: Omit<CreateOfferDto, 'author'>,
  user: CreateUserDto,
}

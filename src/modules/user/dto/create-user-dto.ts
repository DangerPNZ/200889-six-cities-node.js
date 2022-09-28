import {UserType} from '../../../i-rental-offer.js';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarUrl?: string;
  public password!: string;
  public userType!: UserType;
}

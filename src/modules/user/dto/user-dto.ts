import {UserType} from '../../../i-offer.js';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarUrl?: string;
  public password!: string;
  public userType!: UserType;
}

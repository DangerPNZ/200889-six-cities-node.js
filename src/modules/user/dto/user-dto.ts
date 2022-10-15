import {UserType} from '../../../i-offer.js';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarUrl?: string;
  public password!: string;
  public userType!: UserType;
}

export class LoginUserDto {
  public email!: string;
  public password!: string;
}

import {Expose} from 'class-transformer';

export default class AuthenticateUserResponse {
  @Expose()
  public token!: string;
}

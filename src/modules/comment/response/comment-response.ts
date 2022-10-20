import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user-response.js';

export default class CommentResponse {
  @Expose()
  public text!: string;

  @Expose({name: 'createdAt'})
  public publicationDate!: string;

  @Expose()
  public rating!: number;

  @Expose()
  @Type(() => UserResponse)
  public author!: UserResponse;
}

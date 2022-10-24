import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';
import {EMAIL_MATCH_REGEX, IAuthor, IUserEntity, UserType} from './user-contracts.js';

const defaultAvatarURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2h6UWR0YH-vKjKSIL4dteZRo3hbpQ1W7EDw&usqp=CAU';
const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Users',
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements IUserEntity {
  constructor(data: IAuthor) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.password = data.password;
    this.userType = data.userType;
  }

  @prop({
    required: true,
  })
  public name!: string;

  @prop({
    unique: true,
    match: [EMAIL_MATCH_REGEX, 'Email is incorrect'],
    required: true,
  })
  public email!: string;

  @prop({
    default: defaultAvatarURL,
  })
  public avatar?: string;

  @prop({
    required: true,
  })
  public userType!: UserType;

  @prop({
    required: true,
  })
  private password!: string;

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

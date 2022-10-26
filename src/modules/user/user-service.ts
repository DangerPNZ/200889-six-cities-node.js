import {DocumentType, types} from '@typegoose/typegoose';
import {IUserService} from './i-user-service.js';
import {CreateUserDto, LoginUserDto} from './dto/user-dto.js';
import {UserEntity} from './user-entity.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {DEFAULT_AVATAR_IMG_NAME} from '../../app/constants.js';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (!user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatar: DEFAULT_AVATAR_IMG_NAME});
    user.setPassword(dto.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async updateById(userId: string, avatar: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, {avatar}, {new: true}).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }
    return this.create(dto, salt);
  }

  public async exists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    return Boolean(user);
  }
}

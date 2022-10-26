import {DocumentType} from '@typegoose/typegoose';
import {CreateUserDto, LoginUserDto} from './dto/user-dto.js';
import {UserEntity} from './user-entity.js';
import {IDocumentsExists} from '../../common/middlewares/types/i-documents-exists.js';

export interface IUserService extends IDocumentsExists {
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, avatar: string): Promise<DocumentType<UserEntity> | null>
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}

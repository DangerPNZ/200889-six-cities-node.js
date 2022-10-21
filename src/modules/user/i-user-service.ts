import {DocumentType} from '@typegoose/typegoose';
import {CreateUserDto} from './dto/user-dto.js';
import {UserEntity} from './user-entity.js';
import {IDocumentsExists} from '../../common/middlewares/types/i-documents-exists.js';

export interface IUserService extends IDocumentsExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}

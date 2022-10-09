import {DocumentType} from '@typegoose/typegoose';
import {CreateUserDto} from './dto/user-dto.js';
import {UserEntity} from './user-entity.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}

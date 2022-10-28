import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment-entity.js';
import {CreateCommentDto} from './dto/comment-dto.js';

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string, limit: number): Promise<DocumentType<CommentEntity>[]>;

  deleteByOfferId(offerId: string): Promise<number>;
}

import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment-entity.js';
import {CreateCommentDto} from './dto/comment-dto.js';
import {IDocumentsExists} from '../../common/middlewares/types/i-documents-exists.js';

export interface ICommentService extends IDocumentsExists{
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string, limit: number): Promise<DocumentType<CommentEntity>[]>;
}

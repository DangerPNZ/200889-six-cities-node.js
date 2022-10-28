import {ICommentService} from './i-comment-service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateCommentDto} from './dto/comment-dto.js';
import {CommentEntity} from './comment-entity.js';
import {SortType} from '../../utils/sort-type.js';

@injectable()
export default class CommentService implements ICommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    return  this.commentModel.create(dto);
  }

  public async findByOfferId(offerId: string, limit: number) {
    return this.commentModel.find({offerId}).limit(limit).sort({createdAt: SortType.Down}).populate('author');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}

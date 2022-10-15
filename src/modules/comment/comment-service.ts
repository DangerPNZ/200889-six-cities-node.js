import {ICommentService} from './i-comment-service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateCommentDto} from './dto/comment-dto.js';
import {CommentEntity} from './comment-entity.js';
import {SortType} from '../../utils/sort-type.js';
import {IOfferService} from '../offer/i-offer-service.js';

@injectable()
export default class CommentService implements ICommentService {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.IOfferService) private readonly offerService: IOfferService
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment created');
    await this.offerService.setAvgRateAndCommentsCount(dto.offerId);
    return comment.populate('author');
  }

  public async findByOfferId(offerId: string, limit: number) {
    return this.commentModel.find({offerId}).limit(limit).sort({createdAt: SortType.Down}).populate('author');
  }

  // TODO: Написать вопрос Игорю, как решать вопрос с автоматическим удалением комментариев
  //  после уданения оффера (требование ТЗ), учитывая что по ТЗ явно прописано,
  //  что функциональность удаления комментариев не предусмотренна
  // public async deleteByOfferId(offerId: string): Promise<number> {
  //   const result = await this.commentModel
  //     .deleteMany({offerId})
  //     .exec();
  //   this.logger.info('Offer comments deleted!');
  //   return result.deletedCount;
  // }

}

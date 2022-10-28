import {IOfferService} from './i-offer-service.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {OfferEntity} from './offer-entity.js';
import {types, DocumentType} from '@typegoose/typegoose';
import {CreateOfferDto, UpdateOfferDto} from './dto/offer-dto.js';
import {SortType} from '../../utils/sort-type.js';
import {Types} from 'mongoose';
import {formatRatingValue} from '../../utils/common.js';
import {CreateCommentDto} from '../comment/dto/comment-dto.js';
import {CommentEntity} from '../comment/comment-entity.js';
import {ICommentService} from '../comment/i-comment-service.js';

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILogger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.ICommentService) private readonly commentService: ICommentService
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['author'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<void> {
    await this.offerModel.findByIdAndDelete(offerId);

    this.logger.info(`Offer with id ${offerId} was removed.`);

    const deletedCommentsCount = await this.commentService.deleteByOfferId(offerId);

    if (deletedCommentsCount) {
      this.logger.info(`${deletedCommentsCount} comments was removed.`);
    }
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().limit(limit).sort({createdAt: SortType.Down}).populate(['author']);
  }

  public async get(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['author']).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    const offer = await this.offerModel.findById(offerId);
    return Boolean(offer);
  }

  public async createOfferComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentService.create(dto);
    this.logger.info('New comment created');
    await this.setAvgRateAndCommentsCount(dto.offerId);
    return comment.populate('author');
  }

  public async setAvgRateAndCommentsCount(offerId: string): Promise<void> {
    const offers = await this.offerModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(offerId),
        }
      },
      {
        $lookup: {
          from: 'Comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          ratingAvg: {
            $avg: '$comments.rating',
          },
          commentsCount: {
            $size: '$comments',
          }
        }
      }
    ]).exec();

    const offer = offers[0];
    await this.offerModel.findOneAndUpdate(
      {_id: offer._id},
      {rating: formatRatingValue(offer.ratingAvg), commentsCount: offer.commentsCount}
    );
  }
}

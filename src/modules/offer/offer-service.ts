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

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILogger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
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

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().limit(limit).sort({createdAt: SortType.Down}).populate(['author']);
  }

  public async getOffer(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['author']).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    const offer = await this.offerModel.findById(offerId);
    return Boolean(offer);
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

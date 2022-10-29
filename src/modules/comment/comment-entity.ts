import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user-entity.js';
import {OfferEntity} from '../offer/offer-entity.js';
import {CommentValidation, ICommentEntity} from './comment-contracts.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Comments',
  }
})

export class CommentEntity extends defaultClasses.TimeStamps implements ICommentEntity {
  constructor(data: ICommentEntity) {
    super();

    this.text = data.text;
    this.rating = data.rating;
  }

  @prop({
    ref: () => OfferEntity,
    required: true,
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    required: true,
    type: String,
    trim: true,
    minlength: [
      CommentValidation.Text.MinLength,
      `Minimum text length must be ${CommentValidation.Text.MinLength}`
    ],
    maxlength: [
      CommentValidation.Text.MaxLength,
      `Maximum text length must be ${CommentValidation.Text.MaxLength}`
    ],
  })
  public text!: string;

  @prop({
    required: true,
    type: Number,
    min: [
      CommentValidation.Rating.Min,
      `Minimum rating value must be ${CommentValidation.Rating.Min}`
    ],
    max: [
      CommentValidation.Rating.Max,
      `Maximum rating value must be ${CommentValidation.Rating.Max}`
    ],
  })
  public rating!: number;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public author!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);

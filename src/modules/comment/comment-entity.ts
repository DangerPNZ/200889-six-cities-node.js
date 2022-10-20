import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user-entity.js';
import {OfferEntity} from '../offer/offer-entity.js';
import {ICommentEntity} from './comment-contracts.js';

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
    trim: true,
  })
  public text!: string;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public author!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);

import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {IComment} from '../../i-offer.js';
import {UserEntity} from '../user/user-entity.js';
import {OfferEntity} from '../offer/offer-entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Comments',
  }
})

export class CommentEntity extends defaultClasses.TimeStamps implements Omit<IComment, 'author'> {
  constructor(data: IComment) {
    super();

    this.text = data.text;
    this.publicationDate = data.publicationDate;
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
  public publicationDate!: Date;

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

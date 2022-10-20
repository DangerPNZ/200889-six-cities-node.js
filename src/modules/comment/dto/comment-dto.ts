import {IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {CommentValidation} from '../comment-contracts.js';

export class DataCommentDto {
  @IsString({message: 'text value must be string'})
  @MinLength(
    CommentValidation.Text.MinLength,
    {message: `Minimum text length must be ${CommentValidation.Text.MinLength}`}
  )
  @MaxLength(
    CommentValidation.Text.MaxLength,
    {message: `Maximum text length must be ${CommentValidation.Text.MaxLength}`}
  )
  public text!: string;

  @IsInt({message: 'rating must be an integer'})
  @Min(
    CommentValidation.Rating.Min,
    {message: `Minimum rating value must be ${CommentValidation.Rating.Min}`}
  )
  @Max(
    CommentValidation.Rating.Max,
    {message: `Maximum rating value must be ${CommentValidation.Rating.Max}`}
  )
  public rating!: number;

  @IsMongoId({message: 'author field must be valid an id'})
  public author!: string;
}

export class CreateCommentDto extends DataCommentDto {
  @IsMongoId({message: 'offerId field must be valid an id'})
  public offerId!: string;
}

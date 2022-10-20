import {IAuthor} from '../user/user-contracts.js';

export const DEFAULT_COMMENTS_LIMIT = 50;

export const CommentValidation = {
  Text: {
    MinLength: 5,
    MaxLength: 1024,
  },
  Rating: {
    Min: 1,
    Max: 5,
  },
} as const;

export interface IComment {
  text: string;
  publicationDate: Date;
  rating: number;
  author: IAuthor;
}

export interface ICommentEntity extends Omit<IComment, 'publicationDate' | 'author'> {}

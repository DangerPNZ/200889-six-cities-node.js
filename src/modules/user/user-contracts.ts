export const JWT_ALGORITHM = 'HS256';

export const EMAIL_MATCH_REGEX = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const UserValidation = {
  Name: {
    MinLength: 1,
    MaxLength: 15,
  },
  Password: {
    MinLength: 6,
    MaxLength: 12,
  }
} as const;

export enum UserType {
  Ordinary = 'обычный',
  Pro = 'pro',
}

export interface IAuthor {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: UserType;
}

export interface IUserEntity extends Omit<IAuthor, 'password'> {}

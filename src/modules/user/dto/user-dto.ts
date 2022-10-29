import {UserType, UserValidation} from '../user-contracts.js';
import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';

export class LoginUserDto {
  @IsEmail({message: 'email value invalid'})
  public email!: string;

  @IsString({message: 'password value must be string'})
  @MinLength(
    UserValidation.Password.MinLength,
    {message: `Minimum password length must be ${UserValidation.Password.MinLength}`}
  )
  @MaxLength(
    UserValidation.Password.MaxLength,
    {message: `Maximum password length must be ${UserValidation.Password.MaxLength}`}
  )
  public password!: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString({message: 'fullName value must be string'})
  @MinLength(
    UserValidation.FullName.MinLength,
    {message: `Minimum fullName length must be ${UserValidation.FullName.MinLength}`}
  )
  @MaxLength(
    UserValidation.FullName.MaxLength,
    {message: `Maximum fullName length must be ${UserValidation.FullName.MaxLength}`}
  )
  public fullName!: string;

  @IsEnum(
    UserType,
    {message: `userType value must be ${UserType.Ordinary} or ${UserType.Pro}`}
  )
  public userType!: UserType;
}



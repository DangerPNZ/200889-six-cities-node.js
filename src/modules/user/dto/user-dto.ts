import {UserType, UserValidation} from '../user-contracts.js';
import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';

export class LoginUserDto {
  @IsEmail({message: 'email value invalid'})
  public email!: string;

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
  @MinLength(
    UserValidation.Name.MinLength,
    {message: `Minimum name length must be ${UserValidation.Name.MinLength}`}
  )
  @MaxLength(
    UserValidation.Name.MaxLength,
    {message: `Maximum name length must be ${UserValidation.Name.MaxLength}`}
  )
  public name!: string;

  @IsString({message: 'avatarUrl value must be string'})
  public avatarUrl?: string;

  @IsEnum(
    UserType,
    {message: `userType value must be ${UserType.Ordinary} or ${UserType.Pro}`}
  )
  public userType!: UserType;
}

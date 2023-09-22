import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public password: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public display_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public password: string;
}

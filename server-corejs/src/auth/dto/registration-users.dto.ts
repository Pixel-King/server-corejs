import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegistraitionUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsOptional()
  public userName: string;

  @IsString()
  @IsOptional()
  public role: string;
}

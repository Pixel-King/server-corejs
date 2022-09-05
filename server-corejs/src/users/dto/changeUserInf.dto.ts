import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangeUserInfDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public userName: string;
}

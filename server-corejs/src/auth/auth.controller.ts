import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistraitionUserDto } from './dto/registration-users.dto';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(private authServic: AuthService) {}

  @Public()
  @Post('login')
  public async login(@Body() loginBody: LoginUserDto) {
    const user = await this.authServic.autorisation(loginBody);
    if (!user) {
      throw new ForbiddenException('wrong email or password');
    }
    return user;
  }

  @Public()
  @Post('signup')
  public async signup(@Body() loginBody: RegistraitionUserDto) {
    const user = await this.authServic.registrairon(loginBody);
    if (!user) {
      throw new ConflictException('User with such email exist');
    }
    return user;
  }
}

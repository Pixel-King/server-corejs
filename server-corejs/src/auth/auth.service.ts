import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { RegistraitionUserDto } from './dto/registration-users.dto';
import { UserModel } from 'src/users/models/user.models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private CryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  public async registrairon(userBody: RegistraitionUserDto) {
    const user = await this.UsersService.findUserBy({ email: userBody.email });
    if (!user) {
      return this.UsersService.createUser(userBody);
    }
    return null;
  }

  public async autorisation(userBody: LoginUserDto) {
    const user = await this.verificate(userBody);

    if (user) {
      return this.getDataToRespnse(user);
    }
    return null;
  }

  public async verificate(userBody: Partial<UserModel>) {
    const user = await this.UsersService.findUserBy({
      email: userBody.email,
    });

    const passwordHash = this.CryptoService.getHash(userBody.password);
    if (user && passwordHash === user.password) {
      return user;
    }
    return null;
  }

  private getDataToRespnse(userBody: Partial<UserModel>) {
    const userData = {
      id: userBody.id,
      email: userBody.email,
      role: userBody.role,
      rating: userBody.rating,
    };
    const token = this.jwtService.sign(userData, {
      secret: process.env.PRIVATE_JWT_KEY,
      expiresIn: '1d',
    });
    return {
      id: userBody.id,
      email: userBody.email,
      role: userBody.role,
      userName: userBody.userName,
      rating: userBody.rating,
      token: token,
    };
  }
}

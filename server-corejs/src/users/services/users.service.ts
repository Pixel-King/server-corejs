import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { UsersDocument, Users } from 'src/schemas/users.schema';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel, UserModelToResponse } from '../models/user.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
    private cryptoService: CryptoService,
  ) {}

  public findAllUsers() {
    return this.usersModel.find();
  }

  public async findUserBy(where: Partial<UserModel>) {
    const user = await this.usersModel.findOne(where);

    return user ?? null;
  }
  public async deleteUser(id: Partial<UserModel>) {
    const user = await this.usersModel.deleteOne(id);

    return user ?? null;
  }

  public async createUser(userBody: CreateUserDto) {
    const user = await this.findUserBy({ email: userBody.email });
    const newUserData = {
      ...userBody,
      password: this.cryptoService.getHash(userBody.password),
    };
    const newUser = new this.usersModel(newUserData);
    if (user) {
      return null;
    }
    const createdUser = await newUser.save();
    delete createdUser.password;
    return this.getUserToResponse(createdUser);
  }

  public getUserToResponse(
    user: Document<unknown, any, UsersDocument> &
      Users &
      Document & {
        _id: Types.ObjectId;
      },
  ): UserModelToResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      userName: user.userName,
    };
  }
}

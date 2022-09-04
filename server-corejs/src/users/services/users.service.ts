import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { UsersDocument, Users } from 'src/schemas/users.schema';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { updatePasedTest, updateReadedArticle } from '../dto/updatePasTest.dto';
import { UserModel, UserModelToResponse } from '../models/user.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
    private cryptoService: CryptoService,
  ) {}

  public async findAllUsers() {
    const allUsers = await this.usersModel.find();
    if (allUsers)
      return allUsers.map(
        (
          el: Document<unknown, any, UsersDocument> &
            Users &
            Document & {
              _id: Types.ObjectId;
            },
        ) => {
          return {
            id: el.id,
            userName: el.userName,
            rating: el.rating,
          };
        },
      );
    return allUsers;
  }

  public async updatePasedTests(id: string, body: updatePasedTest) {
    const findUser = await this.findUserBy({ id });
    if (findUser) {
      let userRating = +findUser.rating;
      const userTests = findUser.passedTests;
      const isPassed = userTests.find((el) => el.testId === body.testId);
      if (!isPassed) {
        userRating += +body.rating;
        userTests.push({ date: body.date, testId: body.testId });
        findUser.rating = `${userRating}`;
        findUser.passedTests = userTests;
        const updateUser = await this.usersModel
          .findByIdAndUpdate(
            { _id: findUser._id },
            this.getUserToResponse(findUser),
          )
          .setOptions({ overwrite: true, new: true });
        return updateUser;
      }
      return null;
    }
    return null;
  }
  public async updateReadedArticle(id: string, body: updateReadedArticle) {
    const findUser = await this.findUserBy({ id });
    if (findUser) {
      let userRating = +findUser.rating;
      const userArt = findUser.readedArticle;
      const isReaded = userArt.find((art) => art.articleId === body.artId);
      if (!isReaded) {
        console.log('123');
        userRating += +body.rating;
        userArt.push({ date: body.date, articleId: body.artId });
        findUser.rating = `${userRating}`;
        findUser.readedArticle = userArt;
        const updateUser = await this.usersModel
          .findByIdAndUpdate(
            { _id: findUser._id },
            this.getUserToResponse(findUser),
          )
          .setOptions({ overwrite: true, new: true });
        return updateUser;
      }
      return null;
    }

    return null;
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
      rating: user.rating,
      passedTests: user.passedTests,
      readedArticle: user.readedArticle,
    };
  }
}

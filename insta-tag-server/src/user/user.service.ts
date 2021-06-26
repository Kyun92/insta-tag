import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import {
  GetAllUserInput,
  GetAllUserOutput,
  GetUserOutput,
  GetUserInput,
} from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findAllUser(getUserInput?: GetAllUserInput): Promise<GetAllUserOutput> {
    try {
      const users = await this.userModel.find({ ...getUserInput }).exec();

      return {
        ok: true,
        users: users,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found users',
      };
    }
  }

  async getUserById(userId: GetUserInput): Promise<GetUserOutput> {
    try {
      const user = await this.userModel.findById(userId).exec();

      return {
        ok: true,
        user,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found user',
      };
    }
  }

  // Createa User
  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const exists = await this.userModel.findOne({
        email: createUserInput.email,
      });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user with that email',
        };
      } else {
        createUserInput.password = await bcrypt
          .hash(createUserInput.password, 10)
          .then((r) => r);
        await new this.userModel(createUserInput).save();
        return {
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: 'Couldn`t create user',
      };
    }
  }

  // Login User
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong Password',
        };
      }

      const token = await this.jwtService.signAsync({ email, _id: user._id });

      console.log('token', token);
      return {
        ok: true,
        token,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Can`t log user in',
      };
    }
  }

  async updateUser(
    _id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      await this.userModel
        .findByIdAndUpdate(_id, updateUserInput, { new: true })
        .exec();
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not update user',
      };
    }
  }

  async deleteUser(_id: MongooseSchema.Types.ObjectId) {
    try {
      // Todo cascade Tags to userId
      // const isTags = this.tagsModel.find({ userId: _id });
      // if(isTags) {
      //   await this.tagsModel.findByIdAndDelete()
      // }
      return await this.userModel.findByIdAndDelete(_id).exec();
    } catch (err) {
      console.error(err);
    }
  }
}

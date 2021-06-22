import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // Createa User
  async createUser(createUserInput: CreateUserInput) {
    const isUser = await this.userModel.findOne({
      email: createUserInput.email,
    });
    if (isUser) {
      throw new GraphQLError('User email already exist');
    } else {
      createUserInput.password = await bcrypt
        .hash(createUserInput.password, 10)
        .then((r) => r);
      return await new this.userModel(createUserInput).save();
    }
  }

  // Login User
  async login({ password, email }) {
    try {
      const user = await this.userModel.findOne({ email });

      return user && (await bcrypt.compare(password, user.password))
        ? await this.jwtService.signAsync({ email, _id: user._id })
        : new GraphQLError('Wrong password/email');
    } catch (err) {
      console.error(err);
    }
  }

  async findAllUser(filters?: ListUserInput) {
    try {
      return await this.userModel.find({ ...filters }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async getUserById(_id: MongooseSchema.Types.ObjectId) {
    try {
      return await this.userModel.findById(_id).exec();
    } catch (err) {
      console.error(err);
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

  async updateUser(
    _id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.userModel
        .findByIdAndUpdate(_id, updateUserInput, { new: true })
        .exec();
    } catch (err) {
      console.error(err);
    }
  }
}

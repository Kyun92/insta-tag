import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { TagsDocument } from 'src/tags/tags.entity';
import { UpdateTagInput } from 'src/tags/tags.input';
import { User, UserDocument } from './user.entity';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private tagsModel: Model<TagsDocument>,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    const isUser = await this.userModel.findOne({
      email: createUserInput.email,
    });
    if (isUser) {
      throw new GraphQLError('User email already exist');
    } else {
      return await new this.userModel(createUserInput).save();
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

  async updateUser(updateUserInput: UpdateUserInput) {
    try {
      console.log('updateUserInput', updateUserInput);
      return await this.userModel
        .findByIdAndUpdate(updateUserInput._id, updateUserInput, { new: true })
        .exec();
    } catch (err) {
      console.error(err);
    }
  }

  // Todo Update 추가
}

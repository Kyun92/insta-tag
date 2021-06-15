import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserInput, ListUserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  async createUser(createUserInput: CreateUserInput) {
    const isUser = await this.userModal.findOne({
      email: createUserInput.email,
    });
    if (isUser) {
      throw new GraphQLError('User email already exist');
    } else {
      return await new this.userModal(createUserInput).save();
    }
  }

  async findAll(filters?: ListUserInput) {
    try {
      return await this.userModal.find({ ...filters }).exec();
    } catch (err) {
      console.error(err);
    }
  }
}

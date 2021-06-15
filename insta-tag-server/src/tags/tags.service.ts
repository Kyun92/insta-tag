import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Tags, TagsDocument } from './tags.entity';
import { CreateTagInput, ListTagsInput, UpdateTagInput } from './tags.input';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags.name) private tagsModel: Model<TagsDocument>,
    private userService: UserService,
  ) {}

  async createTags(createTagsInput: CreateTagInput) {
    const isUser = await this.userService.getUserById(createTagsInput.userId);
    if (isUser) {
      return await new this.tagsModel(createTagsInput).save();
    } else {
      throw new GraphQLError('No User this _id');
    }
  }

  async findALlTags(filter: ListTagsInput) {
    try {
      return await this.tagsModel.find({ ...filter }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async getTagsById(userId: MongooseSchema.Types.ObjectId) {
    try {
      return await this.tagsModel
        .find({
          userId: userId,
        })
        .exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updateTag(updateTagInput: UpdateTagInput) {
    try {
      const isTag = this.tagsModel.findOne({
        _id: updateTagInput._id,
      });

      if (isTag) {
        return await this.tagsModel
          .findByIdAndUpdate(updateTagInput._id, updateTagInput, { new: true })
          .exec();
      } else {
        throw new GraphQLError('No Tag this _id');
      }
    } catch (err) {
      throw new GraphQLError('No Tag this _id');
    }
  }

  async deleteTag(_id: MongooseSchema.Types.ObjectId) {
    try {
      return await this.tagsModel.findByIdAndDelete(_id).exec();
    } catch (err) {
      console.error(err);
    }
  }
}

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
    try {
      const isUser = await this.userService.getUserById(createTagsInput.userId);

      if (isUser) {
        const newTag = await new this.tagsModel(createTagsInput);
        const newTagId = newTag._id as MongooseSchema.Types.ObjectId;

        if (newTagId) {
          const userTags = isUser.tags as MongooseSchema.Types.ObjectId[];
          const tagsArr =
            userTags.length === 0 ? [newTagId] : userTags.concat(newTagId);

          await this.userService.updateUser(isUser._id, {
            _id: isUser._id,
            tags: tagsArr,
          });
        }
        return await newTag.save();
      } else {
        throw new GraphQLError('Tag create Fail');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findALlTags(filter: ListTagsInput) {
    try {
      return await this.tagsModel.find({ ...filter }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async getTagsById(tagId: MongooseSchema.Types.ObjectId) {
    try {
      return await this.tagsModel
        .find({
          _id: tagId,
        })
        .exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updateTag(updateTagInput: UpdateTagInput) {
    try {
      const isTag = await this.tagsModel.findOne({
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

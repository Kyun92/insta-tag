import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTagsInput, CreateTagsOutput } from './dto/create-tags.dto';
import { ListTagsInput, UpdateTagInput } from './dto/tags.input';
import { Tags, TagsDocument } from './entities/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags.name) private tagsModel: Model<TagsDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  async createTags(
    createTagsInput: CreateTagsInput,
  ): Promise<CreateTagsOutput> {
    try {
      // ? 왜 이건 안불러지는건데?
      // const isUser = await this.userService.getUserById({
      //   userId: createTagsInput.userId,
      // });
      const isUser = await this.userModel.findById(createTagsInput.userId);

      if (isUser) {
        const newTag = await new this.tagsModel(createTagsInput);
        const newTagId = newTag._id as MongooseSchema.Types.ObjectId;

        if (newTagId) {
          const userTags = isUser.tags as MongooseSchema.Types.ObjectId[];
          const tagsArr =
            userTags.length === 0 ? [newTagId] : userTags.concat(newTagId);

          await this.userService.updateUser(isUser._id, {
            tags: tagsArr,
          });
        }
        await newTag.save();
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'User not Found',
        };
      }
    } catch (err) {
      return {
        ok: false,
        error: 'Could not create tags',
      };
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

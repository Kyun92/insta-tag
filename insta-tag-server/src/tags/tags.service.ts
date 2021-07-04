import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetAllUserInput } from 'src/user/dto/get-user.dto';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTagsInput, CreateTagsOutput } from './dto/create-tags.dto';
import { DeleteTagInput } from './dto/delete-tags.dto';
import {
  GetAllTagsOutput,
  GetTagInput,
  GetTagsOutput,
} from './dto/get-tags.dto';
import { UpdateTagInput, UpdateTagOutput } from './dto/update-tag.dto';
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
      const isUser = await this.userService.getUserById({
        userId: createTagsInput.userId,
      });

      if (isUser.ok) {
        const newTag = await new this.tagsModel(createTagsInput);
        const newTagId = newTag._id as MongooseSchema.Types.ObjectId;

        if (newTagId) {
          const userTags = isUser.user.tags as MongooseSchema.Types.ObjectId[];
          const tagsArr =
            userTags.length === 0 ? [newTagId] : userTags.concat(newTagId);

          await this.userService.updateUser(isUser.user._id, {
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

  async findALlTags(
    getAllTagInput?: GetAllUserInput,
  ): Promise<GetAllTagsOutput> {
    try {
      const tags = await this.tagsModel.find({ ...getAllTagInput }).exec();

      return {
        ok: true,
        tags,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not find tags',
      };
    }
  }

  async getTagsById(getTagInput: GetTagInput): Promise<GetTagsOutput> {
    try {
      const tag = await this.tagsModel
        .findById({
          _id: getTagInput._id,
        })
        .exec();

      return {
        ok: true,
        tag: tag,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found tag by Id',
      };
    }
  }

  async updateTag(updateTagInput: UpdateTagInput): Promise<UpdateTagOutput> {
    try {
      const isTag = await this.tagsModel.findOne({
        _id: updateTagInput._id,
      });

      if (isTag) {
        await this.tagsModel
          .findByIdAndUpdate(updateTagInput._id, updateTagInput, { new: true })
          .exec();

        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not found Tag by Id',
        };
      }
    } catch (err) {
      return {
        ok: false,
        error: 'Coulud not Update Tag',
      };
    }
  }

  async deleteTag(deleteTagInput: DeleteTagInput) {
    try {
      await this.tagsModel.findByIdAndDelete(deleteTagInput._id).exec();
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not delete Tag by Id',
      };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tags, TagsDocument } from './tags.entity';
import { CreateTagInput, ListTagsInput } from './tags.input';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags.name) private tagsModel: Model<TagsDocument>) {}

  async createTags(createTagsInput: CreateTagInput) {
    try {
      return await new this.tagsModel(createTagsInput).save();
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
}

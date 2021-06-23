import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Feeds, FeedsDocument } from './feeds.entity';
import { CreateFeedInput, UpdateFeedInput } from './feeds.input';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Feeds.name) private feedsModel: Model<FeedsDocument>,
  ) {}

  // create
  async createFeed(createFeedInput: CreateFeedInput) {
    return new this.feedsModel(createFeedInput).save();
  }

  // update
  async updateFeed(updateFeedInput: UpdateFeedInput) {
    try {
      const isFeed = await this.feedsModel.findOne({
        _id: updateFeedInput._id,
      });
      if (isFeed) {
        return await this.feedsModel.findByIdAndUpdate(updateFeedInput);
      }
    } catch (err) {
      throw new GraphQLError('No Feed Id');
    }
  }

  // remove
  async deleteFeed(_id: MongooseSchema.Types.ObjectId) {
    try {
      const isFeed = await this.feedsModel.findById(_id);
      if (isFeed) {
        return await this.feedsModel.findByIdAndDelete(_id);
      }
    } catch (err) {
      throw new GraphQLError('No Feed Id');
    }
  }
}

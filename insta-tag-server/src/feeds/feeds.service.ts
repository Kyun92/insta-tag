import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserDocument } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Feeds, FeedsDocument } from './feeds.entity';
import { CreateFeedInput, UpdateFeedInput, ListFeedInput } from './feeds.input';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Feeds.name) private feedsModel: Model<FeedsDocument>,
    private userService: UserService,
  ) {}

  // find all
  async findAllFeeds(filter: ListFeedInput) {
    try {
      return await this.feedsModel.find({ ...filter }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  // find by id

  async getFeedById(feedId: MongooseSchema.Types.ObjectId) {
    try {
      return await this.feedsModel
        .find({
          _id: feedId,
        })
        .exec();
    } catch (err) {
      console.error(err);
    }
  }

  // create
  async createFeed(createFeedInput: CreateFeedInput) {
    try {
      const isUser = await this.userService.getUserById({
        userId: createFeedInput.userId,
      });
      if (isUser.ok) {
        const newFeed = await new this.feedsModel(createFeedInput);
        const newFeedId = newFeed._id as MongooseSchema.Types.ObjectId;

        if (newFeedId) {
          const userFeeds = isUser.user
            .feeds as MongooseSchema.Types.ObjectId[];
          const feedArr =
            userFeeds.length === 0 ? [newFeedId] : userFeeds.concat(newFeedId);

          await this.userService.updateUser(isUser.user._id, {
            feeds: feedArr,
          });
        }
        return await newFeed.save();
      } else {
        throw new GraphQLError('Feed create Fail');
      }
    } catch (err) {
      console.error(err);
    }
  }

  // update
  async updateFeed(updateFeedInput: UpdateFeedInput) {
    try {
      const isFeed = await this.feedsModel.findOne({
        _id: updateFeedInput._id,
      });

      if (isFeed) {
        return await this.feedsModel
          .findByIdAndUpdate(updateFeedInput._id, updateFeedInput, {
            new: true,
          })
          .exec();
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

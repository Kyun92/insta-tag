import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Feeds, FeedsDocument } from './entities/feeds.entity';

import { CreateFeedInput, CreateFeedOutput } from './dto/create-feeds.dto';
import {
  GetAllFeedInput,
  GetAllFeedOutput,
  GetFeedInput,
  GetFeedOutput,
} from './dto/get-feeds.dto';
import { UpdateFeedInput, UpdateFeedOutput } from './dto/update-feeds.dtd';

@Injectable()
export class FeedsService {
  constructor(
    @InjectModel(Feeds.name) private feedsModel: Model<FeedsDocument>,
    private userService: UserService,
  ) {}

  // find all
  async findAllFeeds(
    getAllFeedInput: GetAllFeedInput,
  ): Promise<GetAllFeedOutput> {
    try {
      const feeds = await this.feedsModel.find({ ...getAllFeedInput }).exec();
      return {
        ok: true,
        feeds: feeds,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found Feeds',
      };
    }
  }

  // find by id

  async getFeedById(getFeedInput: GetFeedInput): Promise<GetFeedOutput> {
    try {
      const feed = await this.feedsModel
        .findById({
          _id: getFeedInput._id,
        })
        .exec();
      return {
        ok: true,
        feed: feed,
      };
    } catch (err) {
      return {
        ok: false,
        error: 'Could not found feed by id',
      };
    }
  }

  // create
  async createFeed(
    createFeedInput: CreateFeedInput,
  ): Promise<CreateFeedOutput> {
    try {
      const isUser = await this.userService.getUserById({
        userId: createFeedInput.userId,
      });
      if (isUser.ok) {
        const { user } = isUser;
        const newFeed = await new this.feedsModel(createFeedInput);
        const newFeedId = newFeed._id as MongooseSchema.Types.ObjectId;

        if (newFeedId) {
          const userFeeds = user.feeds as MongooseSchema.Types.ObjectId[];
          const feedArr =
            userFeeds.length === 0 ? [newFeedId] : userFeeds.concat(newFeedId);

          await this.userService.updateUser(user._id, {
            feeds: feedArr,
          });
        }
        await newFeed.save();
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not found user',
        };
      }
    } catch (err) {
      return {
        ok: false,
        error: 'Could not create feed',
      };
    }
  }

  // update
  async updateFeed(
    updateFeedInput: UpdateFeedInput,
  ): Promise<UpdateFeedOutput> {
    try {
      const isFeed = await this.feedsModel.findOne({
        _id: updateFeedInput._id,
      });

      if (isFeed) {
        await this.feedsModel
          .findByIdAndUpdate(updateFeedInput._id, updateFeedInput, {
            new: true,
          })
          .exec();
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not found feed by id',
        };
      }
    } catch (err) {
      return {
        ok: false,
        error: 'Could not update feed',
      };
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

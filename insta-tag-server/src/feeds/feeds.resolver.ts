import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Feeds } from './entities/feeds.entity';
import { FeedsService } from './feeds.service';
import { Schema as MongooseSchema } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/user.guard';
import { CreateFeedInput, CreateFeedOutput } from './dto/create-feeds.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import {
  GetAllFeedInput,
  GetAllFeedOutput,
  GetFeedInput,
  GetFeedOutput,
} from './dto/get-feeds.dto';
import { UpdateFeedInput } from './dto/update-feeds.dtd';

@Resolver()
export class FeedsResolver {
  constructor(private feedsService: FeedsService) {}

  // find all
  @Query(() => GetAllFeedOutput)
  async findAllFeeds(
    @Args('getAllFeedInput', { nullable: true })
    getAllFeedInput: GetAllFeedInput,
  ) {
    return await this.feedsService.findAllFeeds({ ...getAllFeedInput });
  }

  // find by id
  @Query(() => GetFeedOutput)
  async getFeedById(
    @Args('getFeedInput', { type: () => String })
    getFeedInput: GetFeedInput,
  ) {
    return await this.feedsService.getFeedById(getFeedInput);
  }

  // create
  @Mutation(() => CreateFeedOutput)
  @UseGuards(GqlAuthGuard)
  async createFeed(
    @CurrentUser() user: User,
    @Args('createFeedInput') createFeedInput: CreateFeedInput,
  ) {
    return await this.feedsService.createFeed({
      userId: user._id,
      ...createFeedInput,
    });
  }

  // update
  @Mutation(() => Feeds)
  @UseGuards(GqlAuthGuard)
  async updateFeed(@Args('updateFeedInput') updateFeedInput: UpdateFeedInput) {
    return await this.feedsService.updateFeed(updateFeedInput);
  }

  // delete
  @Mutation(() => Feeds)
  @UseGuards(GqlAuthGuard)
  async deleteFeed(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return await this.feedsService.deleteFeed(_id);
  }
}

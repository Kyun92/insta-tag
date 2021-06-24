import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Feeds } from './feeds.entity';

import { CreateFeedInput, ListFeedInput, UpdateFeedInput } from './feeds.input';
import { FeedsService } from './feeds.service';
import { Schema as MongooseSchema } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/user.guard';

@Resolver()
export class FeedsResolver {
  constructor(private feedsService: FeedsService) {}

  // find all
  @Query(() => [Feeds])
  async findAllFeeds(
    @Args('filter', { nullable: true }) filter: ListFeedInput,
  ) {
    return await this.feedsService.findAllFeeds({ ...filter });
  }

  // find by id
  @Query(() => Feeds)
  async getFeedById(
    @Args('feedId', { type: () => String })
    feedId: MongooseSchema.Types.ObjectId,
  ) {
    return await this.feedsService.getFeedById(feedId);
  }

  // create
  @Mutation(() => Feeds)
  @UseGuards(GqlAuthGuard)
  async createFeed(@Args('createFeedInput') createFeedInput: CreateFeedInput) {
    return await this.feedsService.createFeed(createFeedInput);
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

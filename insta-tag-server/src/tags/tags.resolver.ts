import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './tags.entity';
import { CreateTagInput, ListTagsInput, UpdateTagInput } from './tags.input';
import { TagsService } from './tags.service';
import { Schema as MongooseSchema } from 'mongoose';
import { GqlAuthGuard } from 'src/user/user.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => [Tags])
  async findAllTags(@Args('filter', { nullable: true }) filter: ListTagsInput) {
    return await this.tagsService.findALlTags({ ...filter });
  }

  // Get Tag by Id
  @Query(() => [Tags])
  async getTagsById(
    @Args('tagId', { type: () => String })
    tagId: MongooseSchema.Types.ObjectId,
  ) {
    return await this.tagsService.getTagsById(tagId);
  }

  // Create Tags
  @Mutation(() => Tags)
  @UseGuards(GqlAuthGuard)
  async createTags(@Args('createTagsInput') createTagsInput: CreateTagInput) {
    return await this.tagsService.createTags(createTagsInput);
  }

  // Update Tag
  @Mutation(() => Tags)
  @UseGuards(GqlAuthGuard)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return await this.tagsService.updateTag(updateTagInput);
  }

  // Delete Tag
  @Mutation(() => Tags)
  @UseGuards(GqlAuthGuard)
  async deleteTag(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return await this.tagsService.deleteTag(_id);
  }
}

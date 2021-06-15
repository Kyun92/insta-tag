import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './tags.entity';
import { CreateTagInput, ListTagsInput, UpdateTagInput } from './tags.input';
import { TagsService } from './tags.service';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => [Tags])
  async findAllTags(@Args('filter', { nullable: true }) filter: ListTagsInput) {
    return await this.tagsService.findALlTags({ ...filter });
  }

  // Create Tags
  @Mutation(() => Tags)
  async createTags(@Args('createTagsInput') createTagsInput: CreateTagInput) {
    return await this.tagsService.createTags(createTagsInput);
  }

  // Get Tag by Id
  @Query(() => [Tags])
  async getTagsById(
    @Args('userId', { type: () => String, nullable: true })
    userId: MongooseSchema.Types.ObjectId,
  ) {
    return await this.tagsService.getTagsById(userId);
  }

  // Update Tag
  @Mutation(() => Tags)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return await this.tagsService.updateTag(updateTagInput);
  }

  // Delete Tag
  @Mutation(() => Tags)
  async deleteTag(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return await this.tagsService.deleteTag(_id);
  }
}

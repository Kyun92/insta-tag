import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './entities/tags.entity';
import { ListTagsInput, UpdateTagInput } from './dto/tags.input';
import { TagsService } from './tags.service';
import { Schema as MongooseSchema } from 'mongoose';
import { GqlAuthGuard } from 'src/user/user.guard';
import { UseGuards } from '@nestjs/common';
import { CreateTagsInput, CreateTagsOutput } from './dto/create-tags.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';

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
  @Mutation(() => CreateTagsOutput)
  @UseGuards(GqlAuthGuard)
  async createTags(
    @CurrentUser() user: User,
    @Args('createTagsInput') createTagsInput: CreateTagsInput,
  ) {
    return await this.tagsService.createTags({
      userId: user._id,
      ...createTagsInput,
    });
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

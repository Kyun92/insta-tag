import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { Schema as MongooseSchema } from 'mongoose';
import { GqlAuthGuard } from 'src/user/user.guard';
import { UseGuards } from '@nestjs/common';
import { CreateTagsInput, CreateTagsOutput } from './dto/create-tags.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import {
  GetAllTagInput,
  GetAllTagsOutput,
  GetTagInput,
  GetTagsOutput,
} from './dto/get-tags.dto';
import { UpdateTagInput, UpdateTagOutput } from './dto/update-tag.dto';
import { DeleteTagInput, DeleteTagOutput } from './dto/delete-tags.dto';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => GetAllTagsOutput)
  async findAllTags(
    @Args('getAllTagInput', { nullable: true }) getAllTagInput: GetAllTagInput,
  ) {
    return await this.tagsService.findALlTags({ ...getAllTagInput });
  }

  // Get Tag by Id
  @Query(() => GetTagsOutput)
  async getTagsById(
    @Args('getTagInput')
    getTagInput: GetTagInput,
  ) {
    return await this.tagsService.getTagsById(getTagInput);
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
  @Mutation(() => UpdateTagOutput)
  @UseGuards(GqlAuthGuard)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return await this.tagsService.updateTag(updateTagInput);
  }

  // Delete Tag
  @Mutation(() => DeleteTagOutput)
  @UseGuards(GqlAuthGuard)
  async deleteTag(@Args('deleteTagInput') deleteTagInput: DeleteTagInput) {
    return await this.tagsService.deleteTag(deleteTagInput);
  }
}

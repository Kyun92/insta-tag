import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './tags.entity';
import { CreateTagInput, ListTagsInput } from './tags.input';
import { TagsService } from './tags.service';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => [Tags])
  async findAllTags(@Args('filter', { nullable: true }) filter: ListTagsInput) {
    return await this.tagsService.findALlTags({ ...filter });
  }

  @Mutation(() => Tags)
  async createTags(@Args('createTagsInput') createTagsInput: CreateTagInput) {
    return await this.tagsService.createTags(createTagsInput);
  }
}

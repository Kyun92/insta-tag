import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UserDocument } from './user.entity';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './user.input';
import { UserService } from './user.service';
import { Schema as MongooseSchema } from 'mongoose';
import { GraphQLError } from 'graphql';
import { Tags } from 'src/tags/tags.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './user.guard';
import { CurrentUser } from './user.decorator';
import { Feeds } from 'src/feeds/feeds.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // find All User
  @Query(() => [User])
  async findAllUsers(
    @Args('filters', { nullable: true }) filters?: ListUserInput,
  ) {
    return this.userService.findAllUser(filters);
  }

  // Get By Id
  @Query(() => User, { nullable: true })
  async getUserById(
    @Args('_id', { type: () => String })
    _id: MongooseSchema.Types.ObjectId,
  ) {
    try {
      return await this.userService.getUserById(_id);
    } catch (err) {
      throw new GraphQLError('User email already exist');
    }
  }

  // Create User
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.createUser(createUserInput);
    } catch (err) {
      console.error(err);
    }
  }

  // Login
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      return await this.userService.login({ email, password });
    } catch (err) {
      console.error(err);
    }
  }

  // Update User
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.userService.updateUser(user._id, updateUserInput);
    } catch (err) {
      console.error(err);
    }
  }

  @ResolveField()
  async tags(
    @Parent() user: UserDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) {
      await user.populate({ path: 'tags', model: Tags.name }).execPopulate();
    }
    return user.tags;
  }

  @ResolveField()
  async feeds(
    @Parent() user: UserDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) {
      await user.populate({ path: 'feeds', model: Feeds.name }).execPopulate();
    }
    return user.feeds;
  }
}

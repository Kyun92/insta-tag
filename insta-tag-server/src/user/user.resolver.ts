import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
import { Tags } from 'src/tags/entities/tags.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './user.guard';
import { CurrentUser } from './user.decorator';
import { Feeds } from 'src/feeds/feeds.entity';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import {
  GetAllUserInput,
  GetAllUserOutput,
  GetUserInput,
  GetUserOutput,
} from './dto/get-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  // find All User
  @Query(() => GetAllUserOutput)
  async findAllUsers(
    @Args('getAllUserInput', { nullable: true })
    getAllUserInput?: GetAllUserInput,
  ) {
    return this.userService.findAllUser(getAllUserInput);
  }

  // Get By Id
  @Query(() => GetUserOutput, { nullable: true })
  async getUserById(
    @Args('getUserInput')
    getUserInput: GetUserInput,
  ) {
    return await this.userService.getUserById(getUserInput);
  }

  // Create User
  @Mutation(() => CreateUserOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  // Login
  @Mutation(() => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  // Update User
  @Mutation(() => UpdateUserOutput)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser(user._id, updateUserInput);
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

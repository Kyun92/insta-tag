import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, ListUserInput } from './user.input';
import { UserService } from './user.service';
import { Schema as MongooseSchema } from 'mongoose';

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
      console.error(err);
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
}

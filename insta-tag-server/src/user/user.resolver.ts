import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, ListUserInput } from './user.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // find All User
  @Query(() => [User])
  async findAllUsers(
    @Args('filters', { nullable: true }) filters?: ListUserInput,
  ) {
    return this.userService.findAll(filters);
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

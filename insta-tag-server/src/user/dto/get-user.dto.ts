import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { User } from '../entities/user.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { Tags } from 'src/tags/entities/tags.entity';
import { Feeds } from 'src/feeds/entities/feeds.entity';

// ? GraphQLError [Object]: Type GetUser must define one or more fields.
// @ObjectType()
// export class GetUser extends PartialType(
//   OmitType(User, ['password'] as const),
// ) {}

// @ObjectType({ isAbstract: true })
// export class GetUser {
//   @Field(() => String)
//   _id?: MongooseSchema.Types.ObjectId;

//   @Field(() => String)
//   email?: string;

//   @Field(() => [Tags], { nullable: true })
//   tags?: MongooseSchema.Types.ObjectId[] | Tags[];

//   @Field(() => [Feeds], { nullable: true })
//   feeds?: MongooseSchema.Types.ObjectId[] | Feeds[];

//   @Field(() => String)
//   createAt?: string;
// }

@InputType()
export class GetAllUserInput extends PartialType(
  PickType(User, ['email', '_id']),
) {}

@ObjectType()
export class GetAllUserOutput extends CoreOutput {
  @Field(() => [User], { nullable: true })
  users?: User[];
  // users?: GetUser[];
}

@InputType()
export class GetUserInput {
  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;
}

@ObjectType()
export class GetUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
  // user?: GetUser;
}

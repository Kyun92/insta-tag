import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
// import { Tags } from 'src/tags/tags.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class ListUserInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  email: string;

  // @Field(() => [String], { nullable: true })
  // tags?: MongooseSchema.Types.ObjectId[];
}

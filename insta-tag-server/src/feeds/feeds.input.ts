import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateFeedInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;

  @Field()
  createdAt: string = new Date().toISOString();
}

@InputType()
export class UpdateFeedInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;
}

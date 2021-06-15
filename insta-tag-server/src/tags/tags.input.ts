import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Tags } from './tags.entity';

@InputType()
export class CreateTagInput {
  @Field(() => [String], { nullable: true })
  tagList: string[];

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;
}

@InputType()
export class ListTagsInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  tagList: string[];
}

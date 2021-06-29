import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@InputType('TagInputType', { isAbstract: true })
@ObjectType()
@Schema()
export class Tags {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  @Prop()
  tagList: string[];

  @Field(() => String)
  @Prop()
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  createdAt: string;
}

export type TagsDocument = Tags & Document;

export const TagsSchema = SchemaFactory.createForClass(Tags);

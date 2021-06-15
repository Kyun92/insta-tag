import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

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
}

export type TagsDocument = Tags & Document;

export const TagsSchema = SchemaFactory.createForClass(Tags);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@InputType('FeedInputType', { isAbstract: true })
@ObjectType()
@Schema()
export class Feeds {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  content: string;

  @Field(() => String)
  @Prop()
  userId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  createdAt: string;
}

export type FeedsDocument = Feeds & Document;

export const FeedsSchema = SchemaFactory.createForClass(Feeds);

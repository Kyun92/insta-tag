import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.entity';

@ObjectType()
@Schema()
export class Feeds {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  contents: string;

  //? 유저와 의존성을 줄지?
  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: MongooseSchema.Types.ObjectId | User;

  @Field(() => String)
  @Prop()
  createdAt: string;
}

export type FeedsDocument = Feeds & Document;

export const FeedsSchema = SchemaFactory.createForClass(Feeds);

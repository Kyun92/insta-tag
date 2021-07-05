import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tags } from 'src/tags/entities/tags.entity';
import { Feeds } from 'src/feeds/entities/feeds.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  createdAt: string;

  @Field(() => [Tags], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Tags.name })
  tags?: MongooseSchema.Types.ObjectId[] | Tags[];

  @Field(() => [Feeds], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Feeds.name })
  feeds?: MongooseSchema.Types.ObjectId[] | Feeds[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

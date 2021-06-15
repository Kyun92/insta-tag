import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { Tags } from 'src/tags/tags.entity';

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

  // @Field(() => [Tags])
  // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Tags.name })
  // tags?: MongooseSchema.Types.ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

// @InputType()
// export class CreateTagInput {
//   @Field(() => [String])
//   tagList: string[];

//   @Field(() => String)
//   userId: MongooseSchema.Types.ObjectId;

//   @Field()
//   createdAt: string = new Date().toISOString();
// }

// @InputType()
// export class ListTagsInput {
//   @Field(() => String, { nullable: true })
//   _id?: MongooseSchema.Types.ObjectId;

//   @Field(() => String, { nullable: true })
//   userId?: MongooseSchema.Types.ObjectId;

//   @Field(() => [String], { nullable: true })
//   tagList?: string[];
// }

// @InputType()
// export class UpdateTagInput {
//   @Field(() => String)
//   _id: MongooseSchema.Types.ObjectId;

//   @Field(() => [String])
//   tagList: string[];
// }

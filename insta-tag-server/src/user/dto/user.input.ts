import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

// @InputType()
// export class CreateUserInput {
//   @Field(() => String)
//   email: string;

//   @Field(() => String)
//   password: string;

//   @Field()
//   createdAt: string = new Date().toISOString();
// }

// @InputType()
// export class ListUserInput {
//   @Field(() => String, { nullable: true })
//   _id?: MongooseSchema.Types.ObjectId;

//   @Field(() => String, { nullable: true })
//   email?: string;

//   @Field(() => [String], { nullable: true })
//   tags?: MongooseSchema.Types.ObjectId[];

//   @Field(() => [String], { nullable: true })
//   feeds?: MongooseSchema.Types.ObjectId[];
// }

// @InputType()
// export class UpdateUserInput {
//   @Field(() => String)
//   _id: MongooseSchema.Types.ObjectId;

//   @Field(() => [String], { nullable: true })
//   tags?: MongooseSchema.Types.ObjectId[];

//   @Field(() => [String], { nullable: true })
//   feeds?: MongooseSchema.Types.ObjectId[];
// }

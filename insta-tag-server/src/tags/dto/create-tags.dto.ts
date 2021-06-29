import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { Tags } from '../entities/tags.entity';

@InputType()
export class CreateTagsInput extends PartialType(
  PickType(Tags, ['userId', 'tagList', 'createdAt']),
) {
  @Field()
  createdAt: string = new Date().toISOString();
}

@ObjectType()
export class CreateTagsOutput extends CoreOutput {}

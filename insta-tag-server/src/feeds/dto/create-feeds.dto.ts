import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { Feeds } from '../entities/feeds.entity';

@InputType()
export class CreateFeedInput extends OmitType(Feeds, ['_id']) {
  @Field()
  createdAt: string = new Date().toISOString();
}

@ObjectType()
export class CreateFeedOutput extends CoreOutput {}

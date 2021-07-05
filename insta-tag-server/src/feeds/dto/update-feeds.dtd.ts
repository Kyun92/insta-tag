import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { Feeds } from '../entities/feeds.entity';

@InputType()
export class UpdateFeedInput extends PickType(Feeds, [
  '_id',
  'userId',
  'content',
]) {}

@ObjectType()
export class UpdateFeedOutput extends CoreOutput {}

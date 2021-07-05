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

// @ObjectType()
// export class GetTag extends PartialType(
//   OmitType(Tags, [''])
// )

@InputType()
export class GetAllFeedInput extends PartialType(Feeds) {}

@ObjectType()
export class GetAllFeedOutput extends CoreOutput {
  @Field(() => [Feeds])
  feeds?: Feeds[];
}

// ? 여기서 태그를 아이디로 검색을 해야할지 유저 아이디로 검색을 해야할지 고민
@InputType()
export class GetFeedInput extends PickType(Feeds, ['_id']) {}

@ObjectType()
export class GetFeedOutput extends CoreOutput {
  @Field(() => Feeds, { nullable: true })
  feed?: Feeds;
}

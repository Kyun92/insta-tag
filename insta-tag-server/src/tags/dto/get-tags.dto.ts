import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from 'src/common/output.dto';
import { Tags } from '../entities/tags.entity';

// @ObjectType()
// export class GetTag extends PartialType(
//   OmitType(Tags, [''])
// )

@InputType()
export class GetAllTagInput extends PartialType(Tags) {}

@ObjectType()
export class GetAllTagsOutput extends CoreOutput {
  @Field(() => [Tags])
  tags?: Tags[];
}

// ? 여기서 태그를 아이디로 검색을 해야할지 유저 아이디로 검색을 해야할지 고민
@InputType()
export class GetTagInput extends PartialType(PickType(Tags, ['_id'])) {}

@ObjectType()
export class GetTagsOutput extends CoreOutput {
  @Field(() => Tags, { nullable: true })
  tag?: Tags;
}

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
export class UpdateTagInput extends PickType(Tags, [
  '_id',
  'userId',
  'tagList',
]) {}

@ObjectType()
export class UpdateTagOutput extends CoreOutput {}

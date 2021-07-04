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
export class DeleteTagInput extends PickType(Tags, ['_id']) {}

@ObjectType()
export class DeleteTagOutput extends CoreOutput {}

import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['tags', 'feeds']),
) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}

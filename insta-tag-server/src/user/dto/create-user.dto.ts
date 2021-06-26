import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'createdAt',
]) {
  @Field()
  createdAt: string = new Date().toISOString();
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}

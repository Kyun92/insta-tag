import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Tags, TagsSchema } from './entities/tags.entity';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tags.name, schema: TagsSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}

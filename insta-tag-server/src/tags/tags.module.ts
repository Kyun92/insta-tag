import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserResolver } from 'src/user/user.resolver';
import { UserService } from 'src/user/user.service';

import { Tags, TagsSchema } from './tags.entity';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tags.name, schema: TagsSchema }]),
    UserModule,
  ],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}

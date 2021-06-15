import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tags, TagsSchema } from './tags.entity';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tags.name, schema: TagsSchema }]),
  ],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}
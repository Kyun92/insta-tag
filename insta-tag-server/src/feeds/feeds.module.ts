import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feeds, FeedsSchema } from './feeds.entity';
import { FeedsService } from './feeds.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feeds.name, schema: FeedsSchema }]),
  ],
  providers: [FeedsService],
})
export class FeedsModule {}

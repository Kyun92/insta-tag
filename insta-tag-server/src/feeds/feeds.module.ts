import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feeds, FeedsSchema } from './entities/feeds.entity';
import { FeedsService } from './feeds.service';
import { FeedsResolver } from './feeds.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feeds.name, schema: FeedsSchema }]),
    UserModule,
  ],
  providers: [FeedsService, FeedsResolver],
})
export class FeedsModule {}

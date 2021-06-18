import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('env work??', process.env.JWT_SECRETKEY);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const port = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
}
bootstrap();

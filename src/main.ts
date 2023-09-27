import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import logger from './common/middleware/function/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { RoleGuard } from './common/guard/role.guard';
import logger from './common/middleware/function/logger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(logger);
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new RoleGuard());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3000);
}
bootstrap();

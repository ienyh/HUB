import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ConfigFactory } from './config';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [CatsModule, RssModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ConfigFactory,
  ],
})
export class AppModule {}

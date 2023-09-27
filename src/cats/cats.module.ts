import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import logger from 'src/common/middleware/function/logger';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .forRoutes({ path: 'cat', method: RequestMethod.POST });
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    consumer.apply(logger);
  }
}

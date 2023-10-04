import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';

@Module({
  providers: [RssService],
  controllers: [RssController],
})
export class RssModule {}

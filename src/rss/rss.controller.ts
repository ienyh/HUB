import { Controller, Get, Header } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller('rss.xml')
export class RssController {
  constructor(private readonly service: RssService) {}

  @Get()
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'text/xml;charset=utf-8')
  async xml() {
    return await this.service.heartstone();
  }
}

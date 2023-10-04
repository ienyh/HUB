import { Injectable } from '@nestjs/common';
import { Feed } from 'feed';

@Injectable()
export class RssService {
  async xml() {
    const feed = new Feed({
      id: 'test',
      title: 'test-title',
      copyright: 'copyright@chenyh.site',
      link: 'http://localhost:3000/list',
      description: 'A TEST RSS FEED BY NEST.JS',
      image: 'https://docs.nestjs.com/assets/Controllers_1.png',
    });
    return feed.rss2();
  }
}

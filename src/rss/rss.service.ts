import { Injectable } from '@nestjs/common';
import { Feed } from 'feed';
import axios from 'axios';
import * as cheerio from 'cheerio';

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
  async heartstone() {
    const feed = new Feed({
      id: 'test',
      title: 'test-title',
      copyright: 'copyright@chenyh.site',
      link: 'http://localhost:3000/list',
      description: '炉石传说-版本通知',
      image: 'https://docs.nestjs.com/assets/Controllers_1.png',
    });
    const baseUrl = 'https://hearthstone.blizzard.com/zh-tw/news';
    const response = await axios.get(baseUrl);
    const $ = cheerio.load(response.data);
    const result = JSON.parse($('[type=application/ld+json]').text());
    const list = result.mainEntity.itemListElement;
    const descriptions = await Promise.all(
      list.map(async (item) => {
        const descriptionResponse = await axios.get(item.url);
        const $ = cheerio.load(descriptionResponse.data);
        return $('div.article-content').html();
      }),
    );
    list.forEach((item, index) => {
      feed.addItem({
        title: item.headline,
        link: item.url,
        date: new Date(item.datePublished),
        description: descriptions[index],
        author: item?.author?.name,
      });
    });
    return feed.rss2();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import BaseConfig from '@/config/base';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: BaseConfig,
  ) {}

  @Get()
  getHello(): string {
    return JSON.stringify({
      env: this.config.env,
      message: this.appService.getHello(),
    });
  }
}

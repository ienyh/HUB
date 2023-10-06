import BaseConfig from './base';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DevelopmentConfig extends BaseConfig {
  get env(): string {
    return 'development';
  }
}

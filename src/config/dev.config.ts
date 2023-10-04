import BaseConfig from './base';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DevConfig extends BaseConfig {
  get env(): string {
    return 'dev';
  }
}

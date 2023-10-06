import BaseConfig from './base';

export default class ProductionConfig extends BaseConfig {
  get env(): string {
    return 'production';
  }
}

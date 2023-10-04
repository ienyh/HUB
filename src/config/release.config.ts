import BaseConfig from './base';

export default class ReleaseConfig extends BaseConfig {
  get env(): string {
    return 'release';
  }
}

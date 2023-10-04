import BaseConfig from './base';
import DevConfig from './dev.config';
import ReleaseConfig from './release.config';

export function getConfigAdapter(): BaseConfig {
  const Config =
    process.env.NODE_ENV === 'development' ? DevConfig : ReleaseConfig;
  return new Config();
}

export const ConfigFactory = {
  provide: BaseConfig,
  useFactory: getConfigAdapter,
};

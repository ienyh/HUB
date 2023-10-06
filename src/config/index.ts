import BaseConfig from './base';
import DevelopmentConfig from './development.config';
import ProductionConfig from './production.config';

export function getConfigAdapter(): BaseConfig {
  const Config =
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfig
      : ProductionConfig;
  return new Config();
}

export const ConfigFactory = {
  provide: BaseConfig,
  useFactory: getConfigAdapter,
};

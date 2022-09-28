import {ILogger} from '../common/logger/i-logger.js';
import {IConfig} from '../common/config/i-config.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component-types.js';
import {IDataBase} from '../common/database-client/i-database.js';
import {getURI} from '../utils/data-base.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDataBase) private dataBaseClient: IDataBase
  ) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.dataBaseClient.connect(uri);
  }
}

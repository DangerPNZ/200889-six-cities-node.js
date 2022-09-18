/* TODO: Спросить у Павла, почему на практике можно обойтись без 'reflect-metadata' тут
TODO: (в демке он есть, шаг 3.22). Но даже описание просит добавить импорт данной библиотеки в точку входа. А точка входа - main
 */
import {ILogger} from '../common/logger/i-logger.js';
import {IConfig} from '../common/config/i-config.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component-types.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig
  ) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}

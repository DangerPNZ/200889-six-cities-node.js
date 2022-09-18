import {injectable} from 'inversify';
import pino, {Logger} from 'pino';
import {ILogger} from './i-logger.js';

@injectable()
export default class LoggerService implements ILogger{
  private logger = pino<Logger>();

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}

import mongoose from 'mongoose';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../logger/i-logger.js';
import {IDataBase} from './i-database.js';

@injectable()
export default class DataBaseService implements IDataBase {
  constructor(@inject(Component.ILogger) private logger: ILogger) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Try to connect to MongoDB…');
    await mongoose.connect(uri);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed.');
  }
}

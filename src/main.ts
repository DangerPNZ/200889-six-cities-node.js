import 'reflect-metadata';
import {Container} from 'inversify';
import {Component} from './types/component-types.js';
import {ILogger} from './common/logger/i-logger.js';
import LoggerService from './common/logger/logger-service.js';
import {IConfig} from './common/config/i-config.js';
import ConfigService from './common/config/config-service.js';
import Application from './app/application.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
applicationContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);

await application.init();

import 'reflect-metadata';
import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {Component} from './types/component-types.js';
import {ILogger} from './common/logger/i-logger.js';
import LoggerService from './common/logger/logger-service.js';
import {IConfig} from './common/config/i-config.js';
import ConfigService from './common/config/config-service.js';
import {IDataBase} from './common/database-client/i-database.js';
import DataBaseService from './common/database-client/data-base-service.js';
import Application from './app/application.js';
import {UserEntity, UserModel} from './modules/user/user-entity.js';
import RentalOfferService from './modules/rental-offer/rental-offer-service.js';
import {IRentalOfferService} from './modules/rental-offer/i-rental-offer-service.js';
import {RentalOfferEntity, RentalOfferModel} from './modules/rental-offer/rental-offer-entity.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
applicationContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
applicationContainer.bind<IDataBase>(Component.IDataBase).to(DataBaseService).inSingletonScope();
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<IRentalOfferService>(Component.IRentalOfferService).to(RentalOfferService);
applicationContainer.bind<types.ModelType<RentalOfferEntity>>(Component.RentalOfferModel).toConstantValue(RentalOfferModel);

const application = applicationContainer.get<Application>(Component.Application);

await application.init();

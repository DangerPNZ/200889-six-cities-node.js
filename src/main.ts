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
import OfferService from './modules/offer/offer-service.js';
import {IOfferService} from './modules/offer/i-offer-service.js';
import {OfferEntity, OfferModel} from './modules/offer/offer-entity.js';
import {ICommentService} from './modules/comment/i-comment-service.js';
import CommentService from './modules/comment/comment-service.js';
import {CommentEntity, CommentModel} from './modules/comment/comment-entity.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
applicationContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
applicationContainer.bind<IDataBase>(Component.IDataBase).to(DataBaseService).inSingletonScope();
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<IOfferService>(Component.IOfferService).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<ICommentService>(Component.ICommentService).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

const application = applicationContainer.get<Application>(Component.Application);

await application.init();

import 'reflect-metadata';
import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {Component} from './types/component-types.js';
import {ILogger} from './common/logger/i-logger.js';
import LoggerService from './common/logger/logger-service.js';
import {IConfig} from './common/config/i-config.js';
import ConfigService from './common/config/config-service.js';
import {IDataBase} from './common/data-base-client/i-data-base.js';
import DataBaseService from './common/data-base-client/data-base-service.js';
import Application from './app/application.js';
import {UserEntity, UserModel} from './modules/user/user-entity.js';
import OfferService from './modules/offer/offer-service.js';
import {IOfferService} from './modules/offer/i-offer-service.js';
import {OfferEntity, OfferModel} from './modules/offer/offer-entity.js';
import {ICommentService} from './modules/comment/i-comment-service.js';
import CommentService from './modules/comment/comment-service.js';
import {CommentEntity, CommentModel} from './modules/comment/comment-entity.js';
import {IController} from './common/controller/i-controller.js';
import OfferController from './modules/offer/offer-controller.js';
import UserController from './modules/user/user-controller.js';
import CommentController from './modules/comment/comment-controller.js';
import {IExceptionFilter} from './common/errors/i-exception-filter.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import {IUserService} from './modules/user/i-user-service.js';
import UserService from './modules/user/user-service.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
applicationContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
applicationContainer.bind<IDataBase>(Component.IDataBase).to(DataBaseService).inSingletonScope();
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<IUserService>(Component.IUserService).to(UserService).inSingletonScope();
applicationContainer.bind<IOfferService>(Component.IOfferService).to(OfferService).inSingletonScope();
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<ICommentService>(Component.ICommentService).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

applicationContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
applicationContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();
applicationContainer.bind<IController>(Component.CommentController).to(CommentController).inSingletonScope();
applicationContainer.bind<IExceptionFilter>(Component.IExceptionFilter).to(ExceptionFilter).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);

await application.init();

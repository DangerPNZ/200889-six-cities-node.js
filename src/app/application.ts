import {ILogger} from '../common/logger/i-logger.js';
import {IConfig} from '../common/config/i-config.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component-types.js';
import {IDataBase} from '../common/data-base-client/i-data-base.js';
import {getURI} from '../utils/data-base.js';
import express, {Express} from 'express';
import {IController} from '../common/controller/i-controller.js';
import {IExceptionFilter} from '../common/errors/i-exception-filter.js';
import {AuthenticateMiddleware} from '../common/middlewares/authentificate-middleware.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDataBase) private dataBaseClient: IDataBase,
    @inject(Component.OfferController) private offerController: IController,
    @inject(Component.UserController) private userController: IController,
    @inject(Component.CommentController) private commentController: IController,
    @inject(Component.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}

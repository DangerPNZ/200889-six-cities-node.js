import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {IUserService} from './i-user-service.js';
import {CreateUserDto} from './dto/user-dto.js';
// import {CreateUserDto, LoginUserDto} from './dto/user-dto.js';
import {StatusCodes} from 'http-status-codes';
import UserResponse from './response/user-response.js';
import {fillDTO} from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import {IConfig} from '../../common/config/i-config.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file-middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists-middleware.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IUserService) private readonly userService: IUserService,
    @inject(Component.IConfig) private readonly configService: IConfig
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    // this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index,});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    response: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const newUser = await this.userService.create(body, this.configService.get('SALT'));

    this.created(
      response,
      fillDTO(UserResponse, newUser)
    );
  }

  public async uploadAvatar(request: Request, response: Response) {
    this.created(response, {
      filepath: request.file?.path
    });
  }

  // TODO: Вход в закрытую часть приложения (тут заглушка). Проверка состояния пользователя. - Реализовываются в другом разделе курса
  // public async login(
  //   {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
  //   _response: Response,
  // ): Promise<void> {
  //   const existsUser = await this.userService.findByEmail(body.email);
  //   if (!existsUser) {
  //     throw new HttpError(
  //       StatusCodes.CONFLICT,
  //       `User with email ${body.email} not found.`,
  //       'UserController',
  //     );
  //   }
  //   throw new HttpError(
  //     StatusCodes.NOT_IMPLEMENTED,
  //     'Not implemented',
  //     'UserController',
  //   );
  // }
}

import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component-types.js';
import {ILogger} from '../../common/logger/i-logger.js';
import {Request, Response} from 'express';
import {HttpMethod} from '../../types/http-method.js';
import {IUserService} from './i-user-service.js';
import {CreateUserDto, LoginUserDto} from './dto/user-dto.js';
import {StatusCodes} from 'http-status-codes';
import UserResponse from './response/user-response.js';
import {fillDTO, createJWT} from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import {IConfig} from '../../common/config/i-config.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto-middleware.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-object-id-middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file-middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists-middleware.js';
import {JWT_ALGORITHM} from './user-contracts.js';
import LoggedUserResponse from './response/logged-user-response.js';
import {UPLOAD_DIRECTORY} from '../../app/constants.js';
import UploadUserAvatarResponse from './response/upload-user-avatar-respose.js';
import AuthenticateUserResponse from './response/authenticate-user-response.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-routes-middleware.js';
import {AnonymousUserMiddleware} from '../../common/middlewares/anonymous-user-middleware.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IConfig) configService: IConfig,
    @inject(Component.IUserService) private readonly userService: IUserService
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new AnonymousUserMiddleware(),
        new ValidateDtoMiddleware(CreateUserDto)
      ],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(UPLOAD_DIRECTORY, 'avatar'),
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

    this.created(response, fillDTO(UserResponse, newUser));
  }

  public async uploadAvatar(request: Request, response: Response) {
    const {userId} = request.params;
    const avatarName = request.file?.filename as string;

    await this.userService.updateById(userId, avatarName);
    this.created(response, fillDTO(UploadUserAvatarResponse, avatarName));
  }

  public async checkAuthenticate(request: Request, response: Response) {
    if (!request.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const user = await this.userService.findByEmail(request.user.email);

    this.ok(response, fillDTO(LoggedUserResponse, user));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    response: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user._id}
    );

    this.ok(response, {
      ...fillDTO(AuthenticateUserResponse, {token}),
    });
  }
}

import {ILogger} from '../common/logger/i-logger.js';
import {IConfig} from '../common/config/i-config.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component-types.js';
import {IDataBase} from '../common/database-client/i-database.js';
import {getURI} from '../utils/data-base.js';
// import {IOfferService} from '../modules/offer/i-offer-service.js';
// import {City, Facility, OfferType} from '../i-offer.js';
// import {IUserService} from '../modules/user/i-user-service.js';
// import {ICommentService} from '../modules/comment/i-comment-service.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDataBase) private dataBaseClient: IDataBase,

    // TODO: Для тестирования сервисов
    // @inject(Component.IOfferService) private offerService: IOfferService,
    // @inject(Component.IUserService) private userService: IUserService,
    // @inject(Component.ICommentService) private commentService: ICommentService
  ) {}

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

    // const comment = await this.commentService.create({
    //   offerId: '6342eb54978a4d0f1ca76fea',
    //   text: 'Неплохо!',
    //   publicationDate: new Date('2022-04-06T08:45:40.283+00:00'),
    //   rating: 4,
    //   author: '6342eb54978a4d0f1ca76fe3',
    // });
    // console.log(comment);
    // await this.offerService.setAvgRateAndCommentsCount();

    // const withAvgRating = await this.offerService.setAvgRateAndCommentsCount();
    // console.log(withAvgRating);

    // const commentsByOffer = await this.commentService.findByOfferId('633a7516c05469905e29cb2c');
    // console.log(commentsByOffer);

    // const newOffer = await this.offerService.create(
    //   {
    //     title: 'Тест',
    //     description: 'Новый',
    //     publicationDate: new Date(),
    //     city: City.PARIS,
    //     previewPhotoUrl: 'previewphoto.jpg',
    //     photosUrls: ['photo.jpg', 'photo.jpg', 'photo.jpg', 'photo.jpg', 'photo.jpg', 'photo.jpg'],
    //     isPremium: true,
    //     offerType: OfferType.HOUSE,
    //     roomsAmount: 5,
    //     guestsLimit: 5,
    //     price: 10500,
    //     facilities: [Facility.LAPTOP_FRIENDLY_WORKSPACE],
    //     author: '633a7516c05469905e29cb2f',
    //     coordinates: [48.85661, 2.351499],
    //   }
    // );
    // console.log(newOffer);

    // const updatedOffer = await this.offerService.updateById('633a7516c05469905e29cb2c', {
    //   title: 'Небывальщина',
    //   description: 'Лакшери вариант',});
    // console.log(updatedOffer);

    // const allOffers = await this.offerService.find();
    // console.log(allOffers);

    // const detalized = await this.offerService.getOfferDetails('633a7516c05469905e29cb2c');
    // console.log(detalized);

    // const deleted = await this.offerService.deleteById('633d0cff8482b484d7247f02');
    // console.log(deleted);
  }
}

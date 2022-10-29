import {ICliCommand} from './i-cli-command.js';
import {Command, IGenerateOfferData} from './contracts.js';
import TsvFileReader from '../../../common/tsv-file-reader.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../../../utils/common.js';
import {IUserService} from '../../../modules/user/i-user-service.js';
import {IOfferService} from '../../../modules/offer/i-offer-service.js';
import {IDataBase} from '../../../common/data-base-client/i-data-base.js';
import {ILogger} from '../../../common/logger/i-logger.js';
import ConsoleLoggerService from '../../../common/logger/console-logger-service.js';
import OfferService from '../../../modules/offer/offer-service.js';
import {OfferModel} from '../../../modules/offer/offer-entity.js';
import {CommentModel} from '../../../modules/comment/comment-entity.js';
import {UserModel} from '../../../modules/user/user-entity.js';
import UserService from '../../../modules/user/user-service.js';
import DataBaseService from '../../../common/data-base-client/data-base-service.js';
import {getURI} from '../../../utils/data-base.js';
import CommentService from '../../../modules/comment/comment-service.js';

const DEFAULT_DB_PORT = 27017;

export default class ImportCommand implements ICliCommand {
  public readonly commandName = Command.Import;
  private userService!: IUserService;
  private offerService!: IOfferService;
  private dataBaseService!: IDataBase;
  private readonly logger: ILogger;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel, new CommentService(CommentModel));
    this.userService = new UserService(this.logger, UserModel);
    this.dataBaseService = new DataBaseService(this.logger);
  }

  private async saveOffer(data: IGenerateOfferData) {
    const author = await this.userService.findOrCreate(data.user, this.salt);

    await this.offerService.create({
      ...data.offer,
      author: author.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(chalk.bgBlack.green(`Импортировано ${count} строк`));
    this.dataBaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.dataBaseService.connect(uri);

    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(chalk.bgBlack.red(`Не удалось прочесть файл: ${getErrorMessage(err)}`));
    }
  }
}

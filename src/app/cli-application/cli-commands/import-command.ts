import {ICliCommand} from './i-cli-command.js';
import {Command} from './types.js';
import TsvFileReader from '../../../common/tsv-file-reader.js';
import chalk from 'chalk';
import {createRentalOffer, getErrorMessage} from '../../../utils/common.js';
import {IUserService} from '../../../modules/user/i-user-service.js';
import {IOfferService} from '../../../modules/offer/i-offer-service.js';
import {IDataBase} from '../../../common/database-client/i-database.js';
import {ILogger} from '../../../common/logger/i-logger.js';
import ConsoleLoggerService from '../../../common/logger/console-logger-service.js';
import OfferService from '../../../modules/offer/offer-service.js';
import {OfferModel} from '../../../modules/offer/offer-entity.js';
import {UserModel} from '../../../modules/user/user-entity.js';
import UserService from '../../../modules/user/user-service.js';
import DataBaseService from '../../../common/database-client/data-base-service.js';
import {getURI} from '../../../utils/data-base.js';
import {IOffer} from '../../../i-offer.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements ICliCommand {
  public readonly name = Command.IMPORT;
  private userService!: IUserService;
  private rentalOfferService!: IOfferService;
  private dataBaseService!: IDataBase;
  private readonly logger: ILogger;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.rentalOfferService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.dataBaseService = new DataBaseService(this.logger);
  }

  private async saveOffer(rentalOffer: IOffer) {
    const author = await this.userService.findOrCreate({
      ...rentalOffer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.rentalOfferService.create({
      ...rentalOffer,
      author: author.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const rentalOffer = createRentalOffer(line);
    await this.saveOffer(rentalOffer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(chalk.bgBlack.green(`Импортированно ${count} строк`));
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
      console.log(chalk.bgBlack.red(`не удалось прочесть файл: ${getErrorMessage(err)}`));
    }
  }
}

import {ICliCommand} from './i-cli-command.js';
import {Command} from './types.js';
import TsvFileReader from '../../../common/tsv-file-reader.js';
import chalk from 'chalk';
import {createRentalOffer, getErrorMessage} from '../../../utils/common.js';

export default class ImportCommand implements ICliCommand {
  public readonly name = Command.IMPORT;

  private onLine(line: string) {
    const offer = createRentalOffer(line);
    console.log(chalk.bgBlack.green(JSON.stringify(offer, null, 4)));
  }

  private onComplete(count: number) {
    console.log(chalk.bgBlack.green(`Импортированно ${count} строк`));
  }

  public async execute(filename: string): Promise<void> {
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

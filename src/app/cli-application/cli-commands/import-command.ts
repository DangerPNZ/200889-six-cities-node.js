import {ICliCommand} from './i-cli-command.js';
import {Command} from './types.js';
import TsvFileReader from '../../../common/tsv-file-reader.js';
import chalk from 'chalk';

export default class ImportCommand implements ICliCommand {
  public readonly name = Command.IMPORT;

  public execute(fileName: string): void {
    const fileReader = new TsvFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(chalk.bgBlack.green(JSON.stringify(fileReader.toArray(), null, 4)));
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(chalk.bgBlack.red(` Не удалось импортировать данные из файла по причине: «${err.message}» `));
    }
  }
}

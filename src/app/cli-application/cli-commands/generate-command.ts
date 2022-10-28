import {ICliCommand} from './i-cli-command.js';
import {Command} from './contracts.js';
import {IMockServerData} from '../../../mocks/i-mock-server-data.js';
import got from 'got';
import chalk from 'chalk';
import {OfferGenerator} from '../../../common/offer-generator/offer-generator.js';
import TsvFileWriter from '../../../common/file-writer/tsv-file-writer.js';

export default class GenerateCommand implements ICliCommand {
  public readonly name = Command.Generate;
  private initialData!: IMockServerData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offersCount = Number(count);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(chalk.bgBlack.red(`  Не удалось получить данные по пути ${url}.  `));
    }

    const offerStringGenerator = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offersCount; i++) {
      await tsvFileWriter.write(offerStringGenerator.generate());
    }

    console.log(chalk.bgBlack.green(` Файл ${filepath} создан!  `));
  }
}

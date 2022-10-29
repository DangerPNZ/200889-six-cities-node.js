import {ICliCommand} from './i-cli-command.js';
import {Command} from './contracts.js';
import {readFileSync} from 'fs';
import chalk from 'chalk';

export default class VersionCommand implements ICliCommand {
  public readonly commandName = Command.Version;

  private readVersion(): string {
    const contentJSONFile = readFileSync('./package.json', { encoding: 'utf8' });
    const parsed = JSON.parse(contentJSONFile);
    return parsed.version;
  }

  public execute() {
    const version = this.readVersion();
    console.log(chalk.bgBlack.yellow(`  Версия приложения: ${chalk.blue(version)} `));
  }
}

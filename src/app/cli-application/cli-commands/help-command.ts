import {ICliCommand} from './i-cli-command.js';
import {Command} from './types.js';
import chalk from 'chalk';

export default class HelpCommand implements ICliCommand {
  public readonly name = Command.HELP;

  public async execute(): Promise<void> {
    console.log(chalk.bgBlack.white(`
  Программа для подготовки данных для REST API сервера.
  Пример:
      main.js --<command> [--arguments]
  Команды:
      ${chalk.green(Command.VERSION)}: # выводит номер версии приложения
      ${chalk.green(Command.HELP)}: # выводит эту подсказку
      ${chalk.green(Command.IMPORT)} ${chalk.yellow('<path>')}: # импортирует данные из TSV
      ${chalk.green(Command.GENERATE)} ${chalk.yellow('<n> <path> <url>')}: # генерирует произвольное количество тестовых данных`));
  }
}

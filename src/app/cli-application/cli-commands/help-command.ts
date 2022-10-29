import {ICliCommand} from './i-cli-command.js';
import {Command} from './contracts.js';
import chalk from 'chalk';

export default class HelpCommand implements ICliCommand {
  public readonly commandName = Command.Help;

  public async execute(): Promise<void> {
    console.log(chalk.bgBlack.white(`
  Программа для подготовки данных для REST API сервера.
  Пример:
      main.js --<command> [--arguments]
  Команды:
      ${chalk.green(Command.Version)}: # выводит номер версии приложения
      ${chalk.green(Command.Help)}: # выводит эту подсказку
      ${chalk.green(Command.Import)} ${chalk.yellow('<filepath>')}: # импортирует данные из TSV
      ${chalk.green(Command.Generate)} ${chalk.yellow('<n> <filepath> <url>')}: # генерирует произвольное количество тестовых данных`));
  }
}

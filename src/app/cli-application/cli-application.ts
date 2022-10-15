import {ICliCommand} from './cli-commands/i-cli-command.js';
import {Command} from './cli-commands/types.js';

type ParsedCommand = {
  [key: string]: string[];
}

export default class CliApplication {
  private readonly defaultCommand = Command.Help;
  private commands: {[commandName: string]: ICliCommand} = {};

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commandList: ICliCommand[]): void {
    commandList.reduce((acc, commandItem) => {
      const cliCommand = commandItem;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  public getCommand(commandName: string): ICliCommand {
    return this.commands[commandName] || this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] || [];
    command.execute(...commandArguments);
  }
}

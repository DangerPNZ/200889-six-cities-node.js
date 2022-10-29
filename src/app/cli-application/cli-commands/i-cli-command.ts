export interface ICliCommand {
  readonly commandName: string;
  execute(...params: string[]): void;
}

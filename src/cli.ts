#!/usr/bin/env node
import CliApplication from './app/cli-application/cli-application.js';
import VersionCommand from './app/cli-application/cli-commands/version-command.js';
import HelpCommand from './app/cli-application/cli-commands/help-command.js';
import ImportCommand from './app/cli-application/cli-commands/import-command.js';

const CLIManager = new CliApplication();

CLIManager.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand]);
CLIManager.processCommand(process.argv);

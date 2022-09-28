#!/usr/bin/env node
import 'reflect-metadata';
import CliApplication from './app/cli-application/cli-application.js';
import VersionCommand from './app/cli-application/cli-commands/version-command.js';
import HelpCommand from './app/cli-application/cli-commands/help-command.js';
import ImportCommand from './app/cli-application/cli-commands/import-command.js';
import GenerateCommand from './app/cli-application/cli-commands/generate-command.js';

const CLIManager = new CliApplication();

CLIManager.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand]);
CLIManager.processCommand(process.argv);

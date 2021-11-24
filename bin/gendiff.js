#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program.configureHelp({
    sortOptions: false,
});

program
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format', 'output format')
  .argument('<pathToFile 1>', 'enter path to file 1')
  .argument('<pathToFile 2>', 'enter path to file 2');

program.parse();

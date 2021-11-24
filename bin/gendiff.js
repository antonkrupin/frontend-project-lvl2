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
  .argument('<pathToFile1>', 'enter path to file 1')
  .argument('<pathToFile2>', 'enter path to file 2')
  .action((pathToFile1, pathToFile2) => {
    console.log('pathToFile1:', pathToFile1);
    console.log('pathToFile2:', pathToFile2);
    console.log(process.cwd())
  });

program.parse();



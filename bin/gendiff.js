#!/usr/bin/env node
import { Command } from 'commander';
import gendiffString from '../src/gendiff-src.js';

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
    const diff = gendiffString(pathToFile1, pathToFile2);
    console.log(diff);
  });

program.parse();

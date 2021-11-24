#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
const program = new Command();

const readFile = (pathToFile) => {
    return readFileSync(pathToFile, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

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

    const file1JSON = JSON.parse(readFile(pathToFile1))
    const file2JSON = JSON.parse(readFile(pathToFile2))

    
  });

program.parse();


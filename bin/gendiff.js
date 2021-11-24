#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import _ from 'lodash';

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

    const readFile = (pathToFile) => {
        return readFileSync(pathToFile, 'utf-8', (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    };

    const file1JSON = JSON.parse(readFile(pathToFile1))
    const file2JSON = JSON.parse(readFile(pathToFile2))

    const keysUnion = _.union(Object.keys(file1JSON), Object.keys(file2JSON)).sort();

    const diffArray = [];

    for (let el of keysUnion) {
        if (_.has(file1JSON, el) && _.has(file2JSON, el)) {
            if (file1JSON[el] === file2JSON[el]) {
                diffArray.push('  ' + el + ': ' + file1JSON[el])
            } else {
                diffArray.push('- ' + el + ': ' + file1JSON[el]);
                diffArray.push('+ ' + el + ': ' + file2JSON[el]);
            }
        } else if (_.has(file1JSON, el)) {
            diffArray.push('- ' + el + ': ' + file1JSON[el]);
        } else if (_.has(file2JSON, el)) {
            diffArray.push('+ ' + el + ': ' + file2JSON[el]);
        }
    }

    console.log(diffArray)
});

program.parse();


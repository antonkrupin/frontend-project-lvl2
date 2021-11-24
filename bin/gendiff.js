#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import _ from 'lodash';

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

    const obj = {};

    /*for (let [key, value] of Object.entries(file1JSON)) {
        if (!_.has(obj, key)) {
            obj[key] = [value];
        } else {
            obj[key].push(value)
        }
    }

    for (let [key, value] of Object.entries(file2JSON)) {
        if (!_.has(obj, key)) {
            obj[key] = [value];
        } else {
            obj[key].push(value)
        }
    }*/

    const customizer = (objValue, srcValue) => {
        return objValue + srcValue;
    };

    const test1 = _.mergeWith(file1JSON, file2JSON, customizer);
    console.log(test1);
    console.log(obj)
});

program.parse();


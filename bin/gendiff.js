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
    /*
    const pushToObject = (object, obj) => {
        for (let [key, value] of Object.entries(object)) {
            if (!_.has(obj, key)) {
                obj[key] = [value];
            } else {
                obj[key].push(value)
            }
        }
    };*/

    const file1JSON = JSON.parse(readFile(pathToFile1))
    const file2JSON = JSON.parse(readFile(pathToFile2))

    //const obj = {};

    const keysArray = _.union(Object.keys(file1JSON), Object.keys(file2JSON));

    console.log(keysArray)
    /*
    pushToObject(file1JSON, obj);
    pushToObject(file2JSON, obj);

    console.log(obj)*/
});

program.parse();


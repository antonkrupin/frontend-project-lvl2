import _ from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFileExtension = (fileName) => path.extname(fileName);

const readFile = (pathToFile) => readFileSync(pathToFile, 'utf-8', (err) => {
  if (err) {
    console.log(err);
  }
});

const parseFile = (file, fileExtension) => {
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return _.load(readFile(file));
  }
  return JSON.parse(readFile(file));
};

export {
  getFileExtension,
  readFile,
  parseFile,
};

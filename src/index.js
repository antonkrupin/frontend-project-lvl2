import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import createDiff from './createDiff.js';
import formattedDiff from './formatters/index.js';

const getFileExtension = (fileName) => path.extname(fileName);

const readFile = (pathToFile) => readFileSync(pathToFile, 'utf-8');

const genDiffString = (path1, path2, formatType = 'stylish') => {
  const parsedFile1 = parseFile(readFile(path1), getFileExtension(path1));
  const parsedFile2 = parseFile(readFile(path2), getFileExtension(path2));

  const diff = createDiff(parsedFile1, parsedFile2);
  return formattedDiff(diff, formatType);
};

export default genDiffString;

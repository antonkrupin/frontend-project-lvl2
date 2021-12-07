import _ from 'lodash';
import { getFileExtension, parseFile } from './parsers.js';

const findDiff = (sortedKeys, file1JSON, file2JSON) => sortedKeys.map((el) => {
  if (_.has(file1JSON, el) && _.has(file2JSON, el)) {
    if (file1JSON[el] === file2JSON[el]) {
      return (`  ${el}: ${file1JSON[el]}`);
    }
    return ([(`- ${el}: ${file1JSON[el]}`), (`+ ${el}: ${file2JSON[el]}`)].join('\n'));
  }
  if (_.has(file1JSON, el)) {
    return (`- ${el}: ${file1JSON[el]}`);
  }
  return (`+ ${el}: ${file2JSON[el]}`);
});
/*
    проверяем свойства
    если свойство простое то идем как обычно
    если свойство объект, то то идем внутрь его
    */

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  console.log(parsedFile1);
  console.log(parsedFile2);

  const sortedKeysUnion = _.union(Object.keys(parsedFile1), Object.keys(parsedFile2)).sort();

  return findDiff(sortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;

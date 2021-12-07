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

const getAllKeys = (obj) => {
  const array = [];
  const getKeys = (o) => {
    const keys = Object.keys(o);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in keys) {
      if (_.isObject(o[keys[key]])) {
        array.push(keys[key]);
        getKeys(o[keys[key]]);
      } else {
        array.push(keys[key]);
      }
    }
  };
  getKeys(obj);
  return array;
};

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.union(Object.keys(parsedFile1), Object.keys(parsedFile2)).sort();

  console.log(sortedKeysUnion);

  return findDiff(sortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;

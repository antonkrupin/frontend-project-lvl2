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
  const getKeys = (o) => {
    const keys = Object.keys(o);
    return keys.map((key) => {
      if (_.isObject(o[key])) {
        return [key, getKeys(o[key])];
      }
      return key;
    });
  };
  return getKeys(obj);
};

const showKeysValues = (keysArray, obj1, obj2) => {
  const test = keysArray.map((e) => {
    if (!_.isObject(e)) {
      console.log('_____');
      console.log(e);
      console.log('______');
      return 1;
    }
    console.log(e);
    return 0;
  });
  return test;
};

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.flattenDeep(_.union(getAllKeys(parsedFile1), getAllKeys(parsedFile2)));
  const uniqSortedKeysUnion = _.uniq(sortedKeysUnion.sort());

  console.log(uniqSortedKeysUnion);

  return findDiff(sortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;

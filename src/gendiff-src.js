import _ from 'lodash';
import { getFileExtension, parseFile } from './parsers.js';
import createDiff from './createDiff.js';

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

export const stringify = (data, replacer = ' ', indentCount = 1, depth = 1) => {
  const setIndent = (treeDepth) => replacer.repeat(indentCount * treeDepth);

  if (typeof (data) !== 'object') {
    return String(data);
  }

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, replacer, indentCount, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth - 1)}}`].join('\n');
};

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.flattenDeep(_.union(getAllKeys(parsedFile1), getAllKeys(parsedFile2)));
  const uniqSortedKeysUnion = _.uniq(sortedKeysUnion.sort());

  return findDiff(uniqSortedKeysUnion, parsedFile1, parsedFile2);
};

const genDiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const diff = createDiff(parsedFile1, parsedFile2);
  return diff;
};

export default gendiffString;

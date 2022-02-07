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

export const stringify = (data, replacer = ' ', indentCount = 1, depth = 1) => {
  const setIndent = (treeDepth) => replacer.repeat(indentCount * treeDepth);

  if (typeof (data) !== 'object') {
    return String(data);
  }

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, replacer, indentCount, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth - 1)}}`].join('\n');
};

const formDiff = (data1, data2) => {
  const calcDiff = (node1, node2, key) => {
    if (!_.has(node1, key)) return { key, status: 'added', value: node2[key] };
    if (!_.has(node2, key)) return { key, status: 'removed', value: node1[key] };
    if (_.isObject(node1[key]) && _.isObject(node2[key])) return { key, status: 'nested', descendants: formDiff(node1[key], node2[key]) };
    if (node1[key] === node2[key]) return { key, status: 'unchanged', value: node1[key] };
    return {
      key, status: 'updated', value1: node1[key], value2: node2[key],
    };
  };

  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const sotredAllKeys = _.sortBy(_.union(data1Keys, data2Keys));

  return sotredAllKeys.map((key) => calcDiff(data1, data2, key));
};

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.flattenDeep(_.union(getAllKeys(parsedFile1), getAllKeys(parsedFile2)));
  const uniqSortedKeysUnion = _.uniq(sortedKeysUnion.sort());

  return findDiff(uniqSortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;

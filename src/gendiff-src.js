import _ from 'lodash';
import { getFileExtension, parseFile } from './parsers.js';
import createDiff from './createDiff.js';

export const stringify = (data, replacer = ' ', indentCount = 1, depth = 1) => {
  const setIndent = (treeDepth) => replacer.repeat(indentCount * treeDepth);

  if (typeof (data) !== 'object') {
    return String(data);
  }

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, replacer, indentCount, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth - 1)}}`].join('\n');
};

const genDiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const diff = createDiff(parsedFile1, parsedFile2);
  return diff;
};

export default genDiffString;

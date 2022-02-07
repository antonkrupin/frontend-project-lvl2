import { getFileExtension, parseFile } from './parsers.js';
import stylish from './formatters/stylish.js';
import createDiff from './createDiff.js';

const genDiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const diff = createDiff(parsedFile1, parsedFile2);
  return stylish(diff);
};

export default genDiffString;

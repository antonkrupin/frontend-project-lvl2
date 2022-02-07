import { getFileExtension, parseFile } from './parsers.js';
import createDiff from './createDiff.js';
import formattedDiff from './formatters/index.js';

const genDiffString = (path1, path2, formatType = 'stylish') => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const diff = createDiff(parsedFile1, parsedFile2);
  return formattedDiff(diff, formatType);
};

export default genDiffString;

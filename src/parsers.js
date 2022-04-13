import _ from 'js-yaml';
// import readFile from './index.js';

/* const getFileExtension = (fileName) => path.extname(fileName);

const readFile = (pathToFile) => readFileSync(pathToFile, 'utf-8', (err) => {
  if (err) {
    console.log(err);
  }
}); */

export const parseFile = (file, fileExtension) => {
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return _.load(file);
  }
  return JSON.parse(file);
};

export default parseFile;

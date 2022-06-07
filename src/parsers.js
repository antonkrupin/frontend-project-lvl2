import _ from 'js-yaml';

const parseFile = (file, fileExtension) => {
  /* if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return _.load(file);
  }
  return JSON.parse(file); */

  switch (fileExtension.slice(1)) {
    case 'yml' || 'yaml':
      return _.load(file);
    default:
      return JSON.parse(file);
  }
};

export default parseFile;

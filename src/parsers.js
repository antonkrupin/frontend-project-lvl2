import _ from 'js-yaml';

const parseFile = (file, fileExtension) => {
  switch (fileExtension.slice(1)) {
    case 'yml' || 'yaml':
      return _.load(file);
    default:
      return JSON.parse(file);
  }
};

export default parseFile;

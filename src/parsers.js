import jsYaml from 'js-yaml';

const parseFile = (file, fileExtension) => {
  switch (fileExtension.slice(1)) {
    case 'yml' || 'yaml':
      return jsYaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error('Wrong file format. Use json or yaml format.');
  }
};

export default parseFile;

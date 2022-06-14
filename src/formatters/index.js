import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formattedDiff = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error('Wrong Formatter type. Use - stylish, plain or json');
  }
};

export default formattedDiff;

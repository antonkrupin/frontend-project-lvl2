import json from 'js-yaml/lib/schema/json';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// eslint-disable-next-line consistent-return
const formattedDiff = (diff, formatType) => {
  // eslint-disable-next-line default-case
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
  }
};

export default formattedDiff;

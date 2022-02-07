import _ from 'lodash';

export const stringify = (data, replacer = ' ', indentCount = 1, depth = 1) => {
  const setIndent = (treeDepth) => replacer.repeat(indentCount * treeDepth);

  if (typeof (data) !== 'object') {
    return String(data);
  }

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, replacer, indentCount, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth - 1)}}`].join('\n');
};

const makeStylish = (diff) => {
  const iter = (currentValue, depth) => {
    const makeString = (object) => {
      switch (object.status) {
        case 'nested':
          return `${setIndent(depth)}${signUnchanged} ${object.key}: ${iter(object.descendants, depth + 1)}`;
        case 'added':
          return `${setIndent(depth)}${signAdded} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'unchanged':
          return `${setIndent(depth)}${signUnchanged} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'removed':
          return `${setIndent(depth)}${signRemoved} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'updated':
          return `${setIndent(depth)}${signRemoved} ${object.key}: ${stringify(object.value1, depth + 1)}\n${setIndent(depth)}${signAdded} ${object.key}: ${stringify(object.value2, depth + 1)}`;
        default:
          throw new Error(`Unknown status: '${object.status}'!`);
      }
    };
    const result = currentValue.map((item) => makeString(item));
    return ['{', ...result, `${setIndent(depth, spacesCount)}}`].join('\n');
  };
  return iter(diff, 1);
};

export default makeStylish;

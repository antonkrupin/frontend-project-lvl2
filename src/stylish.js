import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const setIndent = (treeDepth, spaces = 2) => replacer.repeat(treeDepth * spacesCount - spaces);

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, replacer, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth, spacesCount)}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (currentValue, depth) => {
    const createString = (object) => {
      const unchanged = ' ';
      const added = '+';
      const removed = '-';
      switch (object.status) {
        case 'nested':
          return `${setIndent(depth)}${unchanged} ${object.key}: ${iter(object.descendants, depth + 1)}`;
        case 'added':
          return `${setIndent(depth)}${added} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'unchanged':
          return `${setIndent(depth)}${unchanged} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'removed':
          return `${setIndent(depth)}${removed} ${object.key}: ${stringify(object.value, depth + 1)}`;
        case 'updated':
          return `${setIndent(depth)}${removed} ${object.key}: ${stringify(object.value1, depth + 1)}\n${setIndent(depth)}${added} ${object.key}: ${stringify(object.value2, depth + 1)}`;
        default:
          throw new Error(`Unknown status: '${object.status}'!`);
      }
    };
    const result = currentValue.map((item) => createString(item));
    return ['{', ...result, `${setIndent(depth, spacesCount)}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;

import _ from 'lodash';

const howMuchSpaces = 2;

const setIndent = (treeDepth, spaces = 2) => ' '.repeat(treeDepth * howMuchSpaces - spaces);

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;

  const lines = Object.entries(data).map(([key, val]) => `${setIndent(depth)}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${setIndent(depth, howMuchSpaces)}}`].join('\n');
};

const stylish = (diff) => {
  const recursion = (currentValue, depth) => {
    const createString = (object) => {
      const unchanged = ' ';
      const added = '+';
      const removed = '-';
      switch (object.status) {
        case 'nested':
          return `${setIndent(depth)}${unchanged} ${object.key}: ${recursion(object.descendants, depth + 1)}`;
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
    return ['{', ...result, `${setIndent(depth, howMuchSpaces)}}`].join('\n');
  };
  return recursion(diff, 1);
};

export default stylish;

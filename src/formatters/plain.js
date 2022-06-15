import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const createString = (data, previousNode) => {
  const stringTemplate = `Property '${previousNode.join('.')}' was ${data.type}`;

  if (data.type === 'added') {
    return `${stringTemplate} with value: ${checkValue(data.value)}`;
  }

  if (data.type === 'removed') {
    return `${stringTemplate}`;
  }

  if (data.type === 'updated') {
    return `${stringTemplate}. From ${checkValue(data.value1)} to ${checkValue(data.value2)}`;
  }

  return [];
};

const plain = (diff) => {
  const recursion = (data, previousNode) => {
    const changesString = (obj) => {
      const newPreviousNode = [...previousNode, obj.key];
      if (obj.type === 'nested') {
        return `${recursion(obj.descendants, newPreviousNode)}`;
      }
      return createString(obj, newPreviousNode);
    };

    const result = data.flatMap((el) => changesString(el));
    return result.join('\n');
  };
  return recursion(diff, []);
};

export default plain;

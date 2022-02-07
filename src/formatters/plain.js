import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `${value}`;
  return value;
};

const createString = (data, previousNode) => {
  
};

const plain = (diff) => {

};

export default plain;

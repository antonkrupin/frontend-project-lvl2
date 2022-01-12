import _ from 'lodash';
import { getFileExtension, parseFile } from './parsers.js';

const findDiff = (sortedKeys, file1JSON, file2JSON) => sortedKeys.map((el) => {
  if (_.has(file1JSON, el) && _.has(file2JSON, el)) {
    if (file1JSON[el] === file2JSON[el]) {
      return (`  ${el}: ${file1JSON[el]}`);
    }
    return ([(`- ${el}: ${file1JSON[el]}`), (`+ ${el}: ${file2JSON[el]}`)].join('\n'));
  }
  if (_.has(file1JSON, el)) {
    return (`- ${el}: ${file1JSON[el]}`);
  }
  return (`+ ${el}: ${file2JSON[el]}`);
});

const getAllKeys = (obj) => {
  const getKeys = (o) => {
    const keys = Object.keys(o);
    return keys.map((key) => {
      if (_.isObject(o[key])) {
        return [key, getKeys(o[key])];
      }
      return key;
    });
  };
  return getKeys(obj);
};

const showKeysValues = (keysArray, obj1, obj2) => {
  const test = keysArray.map((e) => {
    if (!_.isObject(e)) {
      console.log('_____');
      console.log(e);
      console.log('______');
      return 1;
    }
    console.log(e);
    return 0;
  });
  return test;
};

const functionForNested = (keys, obj1, obj2) => {
  const isItObject = (key) => {
    const testObj = {};
    if (_.isObject(obj2[key])) {
      testObj[key] = obj2[key];
      //console.log('_____');
      //console.log(testObj);
      const keys = _.keys(testObj[key]);
    }
    const test = findDiff([key], obj1, obj2);
    //console.log(`!!!!!!!!!! ${test}`);
    return (` !!!!${key}: ${test}`);
  };

  const test = keys.map((el) => {
    /*if (_.has(obj1, el) && _.has(obj2, el)) {
      return (` ${el} : ${isItObject(el)}`);
    }*/
    isItObject(el);
  });
  console.log(`!!!! ${test}`);
  return test;
  /*
  проверяем значения по ключам
  если по ключу объект - запускаем снова и запоминаем
  если по ключу простое значение - возвращаем
  */
};

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.flattenDeep(_.union(getAllKeys(parsedFile1), getAllKeys(parsedFile2)));
  const uniqSortedKeysUnion = _.uniq(sortedKeysUnion.sort());
  // console.log(uniqSortedKeysUnion);

  console.log('__________');
  console.log(functionForNested(uniqSortedKeysUnion, parsedFile1, parsedFile2));
  console.log('____________');
  // const test = _.merge(getAllKeys(parsedFile1), getAllKeys(parsedFile2)).flat();
  // console.log(test);
  // console.log(test.length);
  // console.log(sortedKeysUnion);

  // const test1 = showKeysValues(test, parsedFile1, parsedFile2);

  // console.log(test1);

  return findDiff(sortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;

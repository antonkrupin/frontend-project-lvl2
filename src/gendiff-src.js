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
    console.log(`!!!!!!!!!!test ${test}`);
    return (` !!!!${key}: ${test}`);
  };

  const test = keys.map((el) => {
    /*if (_.has(obj1, el) && _.has(obj2, el)) {
      return (` ${el} : ${isItObject(el)}`);
    }*/
    isItObject(el);
  });
  console.log('______________');
  console.log(`!!!! ${test}`);
  return test;
  /*
  по каждому ключу нужно проверить, что лежит в объектах
  если по ключу лежит простое значение,
  то мы сравниваем все это дело через findDiff

  если по ключу лежит объект, то 
  0. создаем объект
  1. проверить наличие ключа в обоих объектах
  2. пройти внутрь содержимого ключа
  3. в содержимом ключа также надо проверять.
  */
};

const findDiffNew = (keys, file1JSON, file2JSON) => keys.map((el) => {
  const goToTheDeep = (elem, file1JSON, file2JSON) => {
    if (_.isObject(file1JSON[elem]) && _.isObject(file2JSON[elem])) {
      const testObj = {};
      const testkeys1 = getAllKeys(file1JSON[elem]);
      const testkeys2 = getAllKeys(file2JSON[elem]);

      const testObj1 = file1JSON[elem];
      const testObj2 = file2JSON[elem];

      const uniqKeys = _.flattenDeep(_.union(testkeys1, testkeys2));

      testObj[elem] = uniqKeys.map((elem1) => {
        //console.log(`element - ${file2JSON[el][elem1]}`);
        //return findDiff([elem1], testObj1, testObj2);
        goToTheDeep(elem1, file1JSON, file2JSON);
      });
      return (`  ${elem}: ${testObj}`);
    }
    return findDiff([elem], file1JSON, file2JSON);
  };
  return goToTheDeep(el, file1JSON, file2JSON);
  /*if (_.isObject(file1JSON[el]) && _.isObject(file2JSON[el])) {
    const testObj = {};
    const testkeys1 = getAllKeys(file1JSON[el]);
    const testkeys2 = getAllKeys(file2JSON[el]);

    const testObj1 = file1JSON[el];
    const testObj2 = file2JSON[el];

    const uniqKeys = _.flattenDeep(_.union(testkeys1, testkeys2));

    testObj[el] = uniqKeys.map((elem) => {
      console.log(`element - ${file2JSON[el][elem]}`);
      return findDiff([elem], testObj1, testObj2);
    });
    console.log('________________');
    console.log(el);
    console.log('__________________');
    console.log(testObj);
    console.log('________________');
    return (`  ${el}: ${testObj}`);
  }
  return findDiff([el], file1JSON, file2JSON);*/
});

/*

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


*/

const gendiffString = (path1, path2) => {
  const parsedFile1 = parseFile(path1, getFileExtension(path1));
  const parsedFile2 = parseFile(path2, getFileExtension(path2));

  const sortedKeysUnion = _.flattenDeep(_.union(getAllKeys(parsedFile1), getAllKeys(parsedFile2)));
  const uniqSortedKeysUnion = _.uniq(sortedKeysUnion.sort());
  //console.log(uniqSortedKeysUnion);

  //console.log('__________');
  //console.log(functionForNested(uniqSortedKeysUnion, parsedFile1, parsedFile2));
  //console.log('____________');
  return findDiffNew(uniqSortedKeysUnion, parsedFile1, parsedFile2);
  
  // const test = _.merge(getAllKeys(parsedFile1), getAllKeys(parsedFile2)).flat();
  // console.log(test);
  // console.log(test.length);
  // console.log(sortedKeysUnion);

  // const test1 = showKeysValues(test, parsedFile1, parsedFile2);

  // console.log(test1);

  //return findDiff(sortedKeysUnion, parsedFile1, parsedFile2);
};

export default gendiffString;


/*

const test1 = {
  "test": 1,
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
  }
};

const test2 = {
  "test": 2,
  "common": {
    "setting1": "Value 1",
    "setting2": 400,
    "setting6": true,
  }
}

const keys = ['test', 'setting1','common', 'setting2', 'test', 'setting3', 'setting6'];

const test = keys.reduce((acc, el) => {
  if (_.has(test1, el) && _.has(test2, el)) {
    if (test1[el] === test2[el]) {
      acc[el] = `  ${el}: ${test1[el]}`;
    };
    acc[el] = [(`- ${el}: ${test1[el]}`), (`+ ${el}: ${test2[el]}`)];
  };
  if(_.has(test1, el)) {
    acc[el] = `- ${el}: ${test1[el]}`;
  }
  acc[el] = `+ ${el}: ${test2[el]}`;
  return acc;
}, {});

console.log(test)

*/
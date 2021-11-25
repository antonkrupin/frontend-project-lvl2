import { readFileSync } from 'fs';
import _ from 'lodash';

const readFile = (pathToFile) => {
    return readFileSync(pathToFile, 'utf-8', (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

const gendiff = (path1, path2) => {
    const file1JSON = JSON.parse(readFile(path1))
    const file2JSON = JSON.parse(readFile(path2))

    const sortedKeysUnion = _.union(Object.keys(file1JSON), Object.keys(file2JSON)).sort();

    const diffArray = sortedKeysUnion.map((el) => {
        if (_.has(file1JSON, el) && _.has(file2JSON, el)) {
            if (file1JSON[el] === file2JSON[el]) {
                return ('  ' + el + ': ' + file1JSON[el])
            } else {
                return ([('- ' + el + ': ' + file1JSON[el]), ('+ ' + el + ': ' + file2JSON[el])].join('\n'))
            }
        } else if (_.has(file1JSON, el)) {
            return ('- ' + el + ': ' + file1JSON[el]);
        } else if (_.has(file2JSON, el)) {
            return ('+ ' + el + ': ' + file2JSON[el]);
        }
    });

    return diffArray.join('\n');
};

export default gendiff;
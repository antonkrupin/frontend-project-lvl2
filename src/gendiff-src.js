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

const findDiff = (sortedKeys, file1JSON, file2JSON) => {
    return sortedKeys.map((el) => {
        if (_.has(file1JSON, el) && _.has(file2JSON, el)) {
            if (file1JSON[el] === file2JSON[el]) {
                return ('  ' + el + ': ' + file1JSON[el]);
            }
            return ([('- ' + el + ': ' + file1JSON[el]), ('+ ' + el + ': ' + file2JSON[el])].join('\n'));
        }
        if (_.has(file1JSON, el)) {
            return ('- ' + el + ': ' + file1JSON[el]);
        }
        return ('+ ' + el + ': ' + file2JSON[el]);
    });
};

const gendiffString = (path1, path2) => {
    const file1JSON = JSON.parse(readFile(path1))
    const file2JSON = JSON.parse(readFile(path2))

    const sortedKeysUnion = _.union(Object.keys(file1JSON), Object.keys(file2JSON)).sort();
    //const test = ['- follow: false', '  host: hexlet.io', '- proxy: 123.234.53.22', '- timeout: 50', '+ timeout: 20', '+ verbose: true'];
    const test2 = findDiff(sortedKeysUnion, file1JSON, file2JSON);
    
    return findDiff(sortedKeysUnion, file1JSON, file2JSON);
};

export default gendiffString;
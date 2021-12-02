import _ from 'js-yaml';
import { readFileSync } from 'fs';

const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
};

const readFile = (pathToFile) => {
    return readFileSync(pathToFile, 'utf-8', (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

const parseFile = (file, fileExtension) => {
    if (fileExtension === 'json') {
        return JSON.parse(readFile(file));
    }
    if (fileExtension === 'yml' || fileExtension === 'yaml') {
        return _.load(readFile(file));
    }
};

export {
    getFileExtension,
    readFile,
    parseFile
}
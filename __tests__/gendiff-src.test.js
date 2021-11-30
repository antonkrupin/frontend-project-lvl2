import gendiffString from "../src/gendiff-src.js";
import path from 'path';

test('gendiffString_nonEqualFiles', () => {
    const path1 = 'file1.json';
    const path2 = 'file2.json';
    const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);
    const file1 = getFixturePath(path1);
    const file2 = getFixturePath(path2);
    const test = ['- follow: false', '  host: hexlet.io', '- proxy: 123.234.53.22', '- timeout: 50', '+ timeout: 20', '+ verbose: true'].join('\n')
    expect(gendiffString(file1, file2).join('\n')).toEqual(test);
});

test('gendiffString_equalFiles', () => {
    const path1 = 'equalFile1.json';
    const path2 = 'equalFile2.json';
    const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);
    const file1 = getFixturePath(path1);
    const file2 = getFixturePath(path2);
    const test = ['  follow: false', '  host: hexlet.io', '  proxy: 123.234.53.22', '  timeout: 50'].join('\n');
    expect(gendiffString(file1, file2).join('\n')).toEqual(test);
});

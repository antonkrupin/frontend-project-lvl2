import gendiffString from "../src/gendiff-src.js";
import path from 'path';

test('gendiffString', () => {
    const path1 = 'file1.json';
    const path2 = 'file2.json';
    const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);
    const test = getFixturePath(path1);
    console.log(test)
    //const stringTest = ('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true')
    const test = ['- follow: false', '  host: hexlet.io', '- proxy: 123.234.53.22', '- timeout: 50', '+ timeout: 20', '+ verbose: true'].join('\n')
    expect(gendiffString(test, path2).join('\n')).toEqual(test);
});
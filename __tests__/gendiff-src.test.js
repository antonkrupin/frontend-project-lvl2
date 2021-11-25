import gendiffString from "../src/gendiff-src.js";

test('gendiffString', () => {
    const path1 = 'file1.json';
    const path2 = 'file2.json';
    const stringTest = ('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true')
    expect(gendiffString(path1, path2)).toEqual(stringTest);
});
//import gendiffString from "../src/gendiff-src.js";

import gendiffString from "../src/gendiff-src";

test('gendiffString', () => {
    const path1 = 'file1.json';
    const path2 = 'file2.json';
    expect(gendiffString(path1, path2)).toEqual('test');
});
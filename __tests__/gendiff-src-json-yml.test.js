import path from 'path';
import gendiffString from '../src/gendiff-src.js';

test('gendiffString_partialNonEqualFiles', () => {
  const path1 = 'file1.yml';
  const path2 = 'file2.json';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['- follow: false', '  host: hexlet.io', '- proxy: 123.234.53.22', '- timeout: 50', '+ timeout: 20', '+ verbose: true'].join('\n');
  expect(gendiffString(file1, file2).join('\n')).toEqual(test);
});

test('gendiffString_equalFiles', () => {
  const path1 = 'equalFile1.json';
  const path2 = 'equalFile2.yml';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['  follow: false', '  host: hexlet.io', '  proxy: 123.234.53.22', '  timeout: 50'].join('\n');
  expect(gendiffString(file1, file2).join('\n')).toEqual(test);
});

test('gendiffString_fullNonEqualFiles', () => {
  const path1 = 'fullNonEqualFile1.yml';
  const path2 = 'fullNonEqualFile2.yml';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['+ follow: false', '+ proxy: 123.234.53.22', '- timeout: 20', '- verbose: true'].join('\n');
  expect(gendiffString(file1, file2).join('\n')).toEqual(test);
});

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import gendiffString from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];

const resultStylish = readFile('result_stylish.txt');
const resultPlain = readFile('result_plain.txt');
const resultJson = readFile('result_json.json');

test.each(formats)('different formats of files %s', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(gendiffString(filePath1, filePath2)).toBe(resultStylish);

  expect(gendiffString(filePath1, filePath2, 'stylish')).toBe(resultStylish);
  expect(gendiffString(filePath1, filePath2, 'plain')).toBe(resultPlain);
  expect(gendiffString(filePath1, filePath2, 'json')).toBe(resultJson);

  expect(() => JSON.parse(gendiffString(filePath1, filePath2, 'json'))).not.toThrow();
  expect(() => gendiffString(filePath1, filePath2, 'jsone')).toThrow();
});

const wrongFormats = ['txt'];

test.each(wrongFormats)('wrong formats of files %s', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(() => gendiffString(filePath1, filePath2)).toThrow();
});

/*
test('gendiffString_partialNonEqualFiles', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['{', '  - follow: false', '    host: hexlet.io', '  - proxy: 123.234.53.22', '  - timeout: 50', '  + timeout: 20', '  + verbose: true', '}'].join('\n');
  expect(gendiffString(file1, file2)).toEqual(test);
});

test('gendiffString_equalFiles', () => {
  const path1 = 'equalFile1.json';
  const path2 = 'equalFile2.json';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['{', '    follow: false', '    host: hexlet.io', '    proxy: 123.234.53.22', '    timeout: 50', '}'].join('\n');
  expect(gendiffString(file1, file2)).toEqual(test);
});

test('gendiffString_fullNonEqualFiles', () => {
  const path1 = 'fullNonEqualFile1.json';
  const path2 = 'fullNonEqualFile2.json';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['{', '  + follow: false', '  + proxy: 123.234.53.22', '  - timeout: 20', '  - verbose: true', '}'].join('\n');
  expect(gendiffString(file1, file2)).toEqual(test);
});

test('gendiffString_PlainFormatter_FullNonEqualFiles', () => {
  const path1 = 'fullNonEqualFile1.json';
  const path2 = 'fullNonEqualFile2.json';
  const getFixturePath = (filename) => path.join('.', '__fixtures__', filename);
  const file1 = getFixturePath(path1);
  const file2 = getFixturePath(path2);
  const test = ['Property follow was added with value: false', 'Property proxy was added with value: 123.234.53.22', 'Property timeout was removed', 'Property verbose was removed'].join('\n');
  expect(gendiffString(file1, file2, 'plain')).toEqual(test);
}); */

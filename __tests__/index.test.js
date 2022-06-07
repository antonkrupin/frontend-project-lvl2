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
const resultStylish1 = readFile('result_stylish1.txt');
const resultPlain = readFile('result_plain.txt');
const resultJson = readFile('result_json.json');

test.each(formats)('different formats of files %s', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(gendiffString(filePath1, filePath2)).toBe(resultStylish);

  //expect(gendiffString(filePath1, filePath2, 'stylish')).toBe(resultStylish);
  expect(gendiffString(filePath1, filePath2, 'plain')).toBe(resultPlain);
  //expect(gendiffString(filePath1, filePath2, 'json')).toBe(resultJson);

  expect(() => JSON.parse(gendiffString(filePath1, filePath2, 'json'))).not.toThrow();
  expect(() => gendiffString(filePath1, filePath2, 'jsone')).toThrow();
});

const formats1 = ['json'];
test.each(formats1)('nested files json format', (format) => {
  const filePath1 = getFixturePath(`fileNested1.${format}`);
  const filePath2 = getFixturePath(`fileNested2.${format}`);
  expect(gendiffString(filePath1, filePath2, 'stylish')).toBe(resultStylish1);
});

const wrongFormats = ['txt'];

test.each(wrongFormats)('wrong formats of files %s', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(() => gendiffString(filePath1, filePath2)).toThrow();
});

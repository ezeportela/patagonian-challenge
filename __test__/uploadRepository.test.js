const fs = require('fs');
const randomstring = require('randomstring');
const uploadRepository = require('../src/domain/uploadRepository');

const randomColumns = (length) =>
  Array(length)
    .fill(0)
    .map((_) => randomstring.generate());

const writeStream = (stream, text) =>
  new Promise((resolve, reject) => {
    stream.write(text + '\n', 'utf8', () => resolve());
  });

const writeHeaders = (stream, headers = [], cols = 0, delimiter) => {
  const _columns = [...headers, ...randomColumns(cols - headers.length)]
    .sort()
    .join(delimiter);
  writeStream(stream, _columns);
};

const writeRow = (stream, cols, delimiter) =>
  writeStream(stream, randomColumns(cols).join(delimiter));

const createCsvFile = async (
  filename,
  size,
  columnNames,
  cols,
  delimiter = ','
) => {
  const stream = fs.createWriteStream(filename);

  await writeHeaders(stream, columnNames, cols, delimiter);
  for (let i = 0; i < size; i++) {
    await writeRow(stream, cols, delimiter);
  }
  stream.end();
};

test('upload csv file', async () => {
  const delimiter = '|';
  filename = 'tmp.csv';

  await createCsvFile(filename, 100, ['columna1', 'column2'], 10, delimiter);
  const fileStream = fs.createReadStream(filename);

  const data = await uploadRepository(fileStream, delimiter);
  console.log(data);

  expect(1).toBe(1);
});

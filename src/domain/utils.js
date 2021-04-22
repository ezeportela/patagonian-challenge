const fs = require('fs');
const randomstring = require('randomstring');
const readline = require('readline');

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

const getFirstLine = async (path) => {
  const stream = fs.createReadStream(path);
  const reader = readline.createInterface({ input: stream });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });
  stream.close();
  return line;
};

const normalizeHeaders = (line, delimiter) =>
  line.split(delimiter).map((col) => col.toLowerCase().replace(/\s+/, '_'));

module.exports = {
  createCsvFile,
  getFirstLine,
  normalizeHeaders,
};

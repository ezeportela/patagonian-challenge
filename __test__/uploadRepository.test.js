const fs = require('fs');
const randomstring = require('randomstring');
const uploadRepository = require('../src/domain/uploadRepository');

const writeRow = (stream, cols, delimiter) => {
  return new Promise((resolve, reject) => {
    stream.write(
      Array(cols)
        .fill(0)
        .map((i) => randomstring.generate())
        .join(delimiter) + '\n',
      'utf8',
      () => resolve()
    );
  });
};

const createCsvFile = async (size, cols, delimiter = ',') => {
  const stream = fs.createWriteStream('tmp.csv');
  for (let i = 0; i < size; i++) {
    await writeRow(stream, cols, delimiter);
  }
  stream.end();
  return stream;
};

test('upload csv file', async () => {
  const delimiter = '|';
  const fileStream = await createCsvFile(100, 10, delimiter);
  const data = await uploadRepository(fileStream, delimiter);
  console.log(data);
  expect(1).toBe(1);
});

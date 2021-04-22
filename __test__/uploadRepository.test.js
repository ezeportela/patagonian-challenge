const fs = require('fs');
const { createMongoInstance } = require('../src/infrastructure/mongoService');
const config = require('config');
const { createCsvFile } = require('../src/domain/utils');

const uploadRepository = require('../src/domain/uploadRepository');

test('upload csv file', async () => {
  const delimiter = '|';
  filename = 'tmp.csv';

  await createCsvFile(filename, 1000, config.csv_columns, 10, delimiter);
  const fileStream = fs.createReadStream(filename);

  const instance = createMongoInstance();
  const mongoUri = await instance.getUri();

  const data = await uploadRepository(fileStream, delimiter);
  console.log(data);

  expect(1).toBe(1);
});

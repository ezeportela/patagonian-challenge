const fs = require('fs');
const config = require('config');
const {
  createMongoInstance,
  connectMongo,
} = require('../src/infrastructure/mongoService');
const { createCsvFile } = require('../src/domain/utils');
const store = require('store');

const uploadRepository = require('../src/domain/uploadRepository');

test('upload csv file', async () => {
  const delimiter = '|';
  filename = 'tmp.csv';
  size = 1000;

  await createCsvFile(filename, size, config.csv_columns, 12, delimiter);
  const fileStream = fs.createReadStream(filename);

  const instance = createMongoInstance();
  const mongoUri = await instance.getUri();

  store.set('mongoUri', mongoUri);

  const data = await uploadRepository(fileStream, delimiter);

  const { dbo } = await connectMongo(mongoUri, 'backoffice');
  const collection = dbo.collection('store');
  const count = await collection.count();
  console.log(count);

  expect(count).toBe(size);
});

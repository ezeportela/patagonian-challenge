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
  try {
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
  } catch (err) {
    expect(err).toBeNull();
    console.log(err);
  }
});

const { getFirstLine, normalizeHeaders } = require('../src/domain/utils');

test('danfo test', async () => {
  try {
    const filename = 'tmp.csv';
    const delimiter = '|';
    const fileStream = fs.createReadStream(filename);

    const line = await getFirstLine(fileStream);
    const headers = normalizeHeaders(line, delimiter);
    console.log(headers);
  } catch (err) {
    console.log(err);
  }
});

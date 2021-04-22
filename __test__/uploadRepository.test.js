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

    columns = [
      'create_date',
      'update date',
      'uuid',
      'vin',
      'price',
      'year',
      'zip code',
    ];
    await createCsvFile(filename, size, columns, 12, delimiter);
    const fileStream = fs.createReadStream(filename);

    const instance = createMongoInstance();
    const mongoUri = await instance.getUri();

    store.set('mongoUri', mongoUri);

    const data = await uploadRepository(
      'test_provider',
      filename,
      fileStream,
      delimiter
    );

    const test = data.data[0].ops[1];
    const { dbo } = await connectMongo(mongoUri, 'backoffice');
    const collection = dbo.collection('store');
    const count = await collection.countDocuments();

    expect(count).toBe(size);
  } catch (err) {
    expect(err).toBeNull();
  }
});

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

    const instance = createMongoInstance();
    const mongoUri = await instance.getUri();

    store.set('mongoUri', mongoUri);

    await uploadRepository('test_provider', filename, delimiter);

    const { dbo } = await connectMongo(mongoUri, 'backoffice');
    const collection = dbo.collection('store');
    const result = await collection
      .aggregate([{ $project: { count: { $size: '$items' } } }])
      .toArray();
    const { count } = result[0];

    expect(count).toBe(size);
  } catch (err) {
    expect(err).toBeNull();
  }
});

const csvBatch = require('csv-batch');
const { connectMongo } = require('../infrastructure/mongoService');
const store = require('store');
const config = require('config');
const _ = require('lodash');
const { readStream, getFirstLine, normalizeHeaders } = require('./utils');

const uploadRepository = async (provider_name, path, delimiter) => {
  const mongoUri = store.get('mongoUri');
  const { dbo } = await connectMongo(mongoUri, 'backoffice');
  const collection = await dbo.collection('store');

  const { insertedId } = await collection.insertOne({
    provider_name,
    creation_date: new Date(),
  });

  const line = await getFirstLine(path);
  const headers = normalizeHeaders(line, delimiter);

  const fileStream = readStream(path);

  return await csvBatch(fileStream, {
    delimiter,
    header: false,
    columns: headers,
    map: (record) => _.pick(record, config.csv_columns),
    reducer: (current, record, index) => {
      if (index > 1 && _.isObject(record)) current.push(record);
      return current;
    },
    batch: true,
    batchSize: config.chunk_size,
    batchExecution: (chunk) =>
      collection.updateOne(
        { _id: insertedId },
        { $push: { items: { $each: chunk } } }
      ),
  });
};

module.exports = uploadRepository;

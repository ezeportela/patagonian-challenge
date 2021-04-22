const csvBatch = require('csv-batch');
const { connectMongo } = require('../infrastructure/mongoService');
const store = require('store');
const config = require('config');
const _ = require('lodash');
const { getFirstLine, normalizeHeaders } = require('./utils');

const uploadRepository = async (provider_name, path, fileStream, delimiter) => {
  const mongoUri = store.get('mongoUri');
  const { dbo } = await connectMongo(mongoUri, 'backoffice');
  const collection = await dbo.collection('store');

  const line = await getFirstLine(path);
  const headers = normalizeHeaders(line, delimiter);

  return csvBatch(fileStream, {
    delimiter,
    header: false,
    columns: headers,
    map: (record) => _.pick({ ...record, provider_name }, config.csv_columns),
    reducer: (current, record, index) => {
      if (index > 1 && _.isObject(record)) current.push(record);
      return current;
    },
    batch: true,
    batchSize: 10000,
    batchExecution: (chunk) => collection.insertMany(chunk),
  });
};

module.exports = uploadRepository;

const csvBatch = require('csv-batch');
const { connectMongo } = require('../infrastructure/mongoService');
const store = require('store');
const config = require('config');
const _ = require('lodash');

const uploadRepository = async (fileStream, delimiter) => {
  const mongoUri = store.get('mongoUri');
  const { dbo } = await connectMongo(mongoUri, 'backoffice');
  const collection = await dbo.collection('store');

  return csvBatch(fileStream, {
    delimiter,
    batch: true,
    batchSize: 10000,
    batchExecution: (chunk) => collection.insertMany(chunk),
  });
};

module.exports = uploadRepository;

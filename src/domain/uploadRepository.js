const csvBatch = require('csv-batch');

const uploadRepository = (fileStream, delimiter) => {
  return csvBatch(fileStream, { delimiter, batch: true, batchSize: 10000 });
};

module.exports = uploadRepository;

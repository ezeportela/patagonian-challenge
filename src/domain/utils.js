const csvBatch = require('csv-batch');

exports.jsonFromCsv = (path, delimiter = ',') => {
  console.log(path);
  return csvBatch(path.buffer, { delimiter, batch: true, batchSize: 10000 });
};

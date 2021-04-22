const fs = require('fs');
const uploadRepository = require('../domain/uploadRepository');
const _ = require('lodash');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
    const start = process.hrtime();

    const csvPath = req.file.path;
    const delimiter = req.body.delimiter;
    const provider_name = req.body.provider_name;

    if (
      _.isEmpty(csvPath) ||
      _.isEmpty(delimiter) ||
      _.isEmpty(provider_name)
    ) {
      res.json({ message: 'bad request' });
    }

    const csvFile = fs.createReadStream(csvPath);

    uploadRepository(provider_name, csvPath, csvFile, delimiter);

    end = process.hrtime(start);
    const time_elapsed = (end[1] / 1000000).toFixed(2);

    res.json({ time_elapsed: `${time_elapsed}ms`, status: 'OK' });
  } catch (err) {
    res.json(err);
  }
};

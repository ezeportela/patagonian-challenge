const fs = require('fs');
const uploadRepository = require('../domain/uploadRepository');
const _ = require('lodash');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
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

    uploadRepository(csvFile, delimiter);
    res.json({ timestamp: new Date(), status: 'OK' });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

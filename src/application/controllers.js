const uploadRepository = require('../domain/uploadRepository');
const _ = require('lodash');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
    const start = process.hrtime();

    const csvPath = req.file.path;
    const { delimiter, provider_name } = req.body;

    if (
      _.isEmpty(csvPath) ||
      _.isEmpty(delimiter) ||
      _.isEmpty(provider_name)
    ) {
      return res.status(400).json({ message: 'bad request' });
    }

    await uploadRepository(provider_name, csvPath, delimiter);

    end = process.hrtime(start);
    const time_elapsed = (end[1] / 1000000).toFixed(2);

    res.json({ time_elapsed: `${time_elapsed}ms`, status: 'OK' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

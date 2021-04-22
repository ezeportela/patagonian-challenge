const { jsonFromCsv } = require('../domain/utils');
const uploadRepository = require('../domain/uploadRepository');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
    const csvPath = req.file;

    const data = await jsonFromCsv(csvPath, '|');
    console.log(data);
    res.json({ timestamp: new Date(), status: 'OK' });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

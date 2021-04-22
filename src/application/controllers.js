const fs = require('fs');
const uploadRepository = require('../domain/uploadRepository');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
    const csvPath = req.file.path;
    const delimiter = req.params.delimiter;
    const provider_name = req.params.provider_name;

    console.log(csvPath, delimiter, provider_name);
    const csvFile = fs.createReadStream(csvPath);

    uploadRepository(csvFile, delimiter);
    res.json({ timestamp: new Date(), status: 'OK' });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

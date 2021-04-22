const fs = require('fs');
const uploadRepository = require('../domain/uploadRepository');

exports.healthcheckController = (_, res) =>
  res.json({ timestamp: new Date(), status: 'OK' });

exports.uploadController = async (req, res) => {
  try {
    const csvPath = req.file.path;
    console.log(csvPath);
    const csvFile = fs.createReadStream(csvPath);

    uploadRepository(csvFile, '|');
    res.json({ timestamp: new Date(), status: 'OK' });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

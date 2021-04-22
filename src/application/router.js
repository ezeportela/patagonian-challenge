const express = require('express');
const multer = require('multer');
const { healthcheckController, uploadController } = require('./controllers');

const router = express.Router();
const upload = multer({ dest: '/tmp' });

router.get('/healthcheck', healthcheckController);

router.post('/upload', upload.single('data'), uploadController);

module.exports = router;

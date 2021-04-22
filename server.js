const express = require('express');
const { api_port: port } = require('config');
const app = express();
const router = require('./src/application/router');

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

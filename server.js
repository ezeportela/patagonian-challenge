const express = require('express');
const { api_port: port } = require('config');
const app = express();
const router = require('./src/application/router');
const { createMongoInstance } = require('./src/infrastructure/mongoService');
const store = require('store');

const instance = createMongoInstance();
instance.getUri().then((mongoUri) => {
  store.set('mongoUri', mongoUri);
  console.log('mongo uri instance:', mongoUri);
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoClient = require('mongodb').MongoClient;

const createMongoInstance = (port = 4000) => {
  return new MongoMemoryServer({ instance: { port } });
};

const connectMongo = (uri, dbName) =>
  new Promise((resolve, reject) =>
    mongoClient.connect(uri, { useUnifiedTopology: true }, (err, instance) => {
      if (err) reject(err);
      const dbo = instance.db(dbName);
      resolve({ dbo, instance });
    })
  );

module.exports = {
  createMongoInstance,
  connectMongo,
};

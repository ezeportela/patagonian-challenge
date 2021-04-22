const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoClient = require('mongodb').MongoClient;

const createMongoInstance = () => {
  return new MongoMemoryServer();
};

const connectMongo = (uri, dbName) =>
  new Promise((resolve, reject) =>
    mongoClient.connect(uri, (err, instance) => {
      if (err) reject(err);
      const dbo = instance.db(dbName);
      resolve({ dbo, instance });
    })
  );

module.exports = {
  createMongoInstance,
  connectMongo,
};

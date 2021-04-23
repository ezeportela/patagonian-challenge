const {
  createMongoInstance,
  connectMongo,
} = require('../src/infrastructure/mongoService');

let instance;
let db;
let dbo;

beforeAll(async () => {
  instance = createMongoInstance();
  const mongoUri = await instance.getUri();
  const mongo = await connectMongo(mongoUri, 'test');
  db = mongo.instance;
  dbo = mongo.dbo;
});

afterAll(async () => {
  await db.close();
  await instance.stop();
});

describe('test mongodb instance', () => {
  it('insert a document into collection', async () => {
    const collection = dbo.collection('foo');
    collection.insertOne({
      timestamp: new Date(),
      name: 'bar',
    });

    const count = await collection.count();

    expect(count).toEqual(1);
  });
});

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: MongoMemoryServer;

beforeAll(async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mongod = await MongoMemoryServer.create();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const uri = mongod.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
    } as mongoose.ConnectOptions;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await mongoose.connect(uri, mongooseOpts);
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

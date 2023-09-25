const { MongoClient } = require('mongodb');
const dbName = 'chat-app';

async function connect() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    return client;
  } catch (err) {
    console.error(err);
  }
}

async function close(client) {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error(err);
  }
}

const processMongoTask = async (cb) => {
  let client;
  try {
    client = await connect();
    const db = client.db(dbName);
    const result = await cb(client, db);
    return result;
  } catch (err) {
    throw err;
  } finally {
    await close(client);
  }
}

const getMessages = async () =>
  processMongoTask((client, db) => db.collection('messages').find({}, { projection: { _id: 0 } }).toArray());

const addMessage = async (message) =>
  processMongoTask((client, db) => db.collection('messages').insertOne(message));

module.exports = {
  getMessages,
  addMessage,
};

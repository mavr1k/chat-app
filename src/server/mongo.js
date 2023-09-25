const { MongoClient } = require('mongodb');
const dbName = 'chat-app';

let client;

async function getClient() {
  if (client) {
    console.log('Using existing connection');
    return client;
  }
  client = await MongoClient.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  return client;
}

async function close(client) {
  await client.close();
  console.log('Disconnected from MongoDB');
}

const processMongoTask = async (cb) => {
  let client;
  try {
    client = await getClient();
    const db = client.db(dbName);
    const result = await cb(client, db);
    return result;
  } catch (err) {
    throw err;
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

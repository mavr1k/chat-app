const { MongoClient } = require('mongodb');
const WebSocket = require('ws');
const dbName = 'chat-app';

let client;
let ws;

async function getClient() {
  if (client) {
    return client;
  }
  client = await MongoClient.connect(process.env.MONGODB_URI);
  console.info('Connected to MongoDB');
  return client;
}

ws = new WebSocket('ws://localhost:8080');

async function close(client) {
  await client.close();
  console.info('Disconnected from MongoDB');
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
  processMongoTask(async (client, db) => {
    await db.collection('messages').insertOne(message);
    ws.send(JSON.stringify(message));
  });

const deleteMessages = async () =>
  processMongoTask((client, db) => db.collection('messages').deleteMany({}));

module.exports = {
  getMessages,
  addMessage,
  deleteMessages,
};

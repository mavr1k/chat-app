const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  let changeStream;

  ws.on('message', async message => {
    const { type, uri, db, collection } = JSON.parse(message);

    if (type === 'subscribe') {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();

      const database = client.db(db);
      const coll = database.collection(collection);

      changeStream = coll.watch();
      changeStream.on('change', next => {
        ws.send(JSON.stringify(next));
      });
    }
  });

  ws.on('close', () => {
    if (changeStream) {
      changeStream.close();
    }
  });
});

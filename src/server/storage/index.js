import path from 'node:path';
const fs = require('node:fs/promises');
const jsonDirectory = path.join(process.cwd(), 'json');

const dbPath = process.env.NODE_ENV !== 'production' ? './db.json' : path.join(process.cwd(), 'db.json');

const getMessages = async () => {
  try {
    const db = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(db);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(dbPath, '[]');
      return [];
    }
  }
}

/**
 * Adds a new message to the database.
 * @param {{from: string, message: string}} message - The message object to be added to the database.
 */
const addMessage = async (message) => {
  const messages = await getMessages();
  messages.push(message);
  await fs.writeFile(dbPath, JSON.stringify(messages));
}

export {
  getMessages,
  addMessage
}

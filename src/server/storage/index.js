const fs = require('node:fs/promises');

const getMessages = async () => {
  try {
    const db = await fs.readFile('./db.json', 'utf8');
    return JSON.parse(db);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile('./db.json', '[]');
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
  await fs.writeFile('./db.json', JSON.stringify(messages));
}

export {
  getMessages,
  addMessage
}

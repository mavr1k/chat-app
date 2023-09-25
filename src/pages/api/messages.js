import { getMessages, addMessage, deleteMessages } from "../../server/mongo";

const route = async (req, res) => {
  const {
    method
  } = req;

  switch (method) {
    case 'GET':
      const messages = await getMessages();
      res.status(200).json(messages);
      break;
    case 'POST':
      const message = req.body;
      if (!message || !message.from || !message.message) {
        res.status(400).json({
          error: 'Bad Request'
        });
        return;
      }
      await addMessage(message);
      res.status(200).json({ ok: true });
      break;
    case 'DELETE':
      await deleteMessages();
      res.status(200).json({ ok: true });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default route;

import { getMessages, addMessage } from "../../server/storage";

const route = async (req, res) => {
  const {
    method
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await getMessages());
      break;
    case "POST":
      console.log(req.body);
      await addMessage(req.body);
      res.status(200).json()
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default route;

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-utils';

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Failed to connect to database' });
    return;
  }

  const eventId = req.query.commentId;
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      client.close();
      return res.status(322).json({ msg: 'Invalid fields' });
    }

    const store = { email, name, text, eventId };

    let result;
    try {
      result = await insertDocument(client, 'comments', store);
      store._id = result.insertedId;
      res.status(201).json({ comment: store, message: 'Success' });
    } catch (e) {
      res.status(500).json({ message: 'Inserting comment failed' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(201).json(documents);
    } catch (e) {
      res.status(500).json({ message: 'Could not get messages' });
    }
  }

  client.close();
};

export default handler;

import { connectDatabase, insertDocument } from '../../../helpers/db-utils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(322).json({ msg: 'No valid email submitted' });
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    return res.status(201).json({ msg: 'Subscribed to newsletter' });
  }
};

export default handler;

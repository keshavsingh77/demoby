
import { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Missing code parameter' });
    }

    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME || 'SilentXBotz'); // Default DB name from bot config
        const collection = db.collection('short_links');

        const result = await collection.findOne({ _id: code as any });

        if (result) {
            // Found! Return the original URL (or token)
            return res.status(200).json({ url: result.url });
        } else {
            return res.status(404).json({ error: 'Link not found' });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

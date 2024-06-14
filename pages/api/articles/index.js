// pages/api/articles/index.js
import { connectToDatabase } from '../../../lib/mongodb';
import Article from '../../../models/Article';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const articles = await Article.find({});
        res.status(200).json(articles);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching articles' });
      }
      break;

    case 'POST':
      try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
      } catch (error) {
        res.status(500).json({ message: 'Error creating article' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
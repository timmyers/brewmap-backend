import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
const db = MongoClient.connect(url);

export default async () => {
  return await db;
}

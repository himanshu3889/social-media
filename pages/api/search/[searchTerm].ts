import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../configs/client';
import { searchPostsQuery, searchUsersQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { searchTerm }: any = req.query;
      const postsQuery = searchPostsQuery(searchTerm);
      const usersQuery = searchUsersQuery(searchTerm);
      
      const posts = await client.fetch(postsQuery);
      const accounts = await client.fetch(usersQuery);

      res.status(200).json({ posts, accounts });
      
    } catch (error) {
      console.log(error)
      res.status(404).json({posts:{}, accounts:{}})
    }
  }
}

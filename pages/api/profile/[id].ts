import type { NextApiRequest, NextApiResponse } from 'next';
import { singleUserQuery, userCreatedPostsQuery } from './../../../utils/queries';
import { client } from '../../../configs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id }:any = req.query;

    const userDetailsQuery = singleUserQuery(id);
    const userPostsQuery = userCreatedPostsQuery(id);

    const user = await client.fetch(userDetailsQuery);
    const userPosts = await client.fetch(userPostsQuery);
   
    const data = { user: user, posts:userPosts };
    res.status(200).json(data);
  }
}

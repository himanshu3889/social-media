import type { NextApiRequest, NextApiResponse } from 'next';

import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../configs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    const postsQuery = allPostsQuery();
    const data = await client.fetch(postsQuery);
    res.status(200).json(data);

  } else if (req.method === 'POST') {
    
    const doc = req.body;
    client.create(doc).then(() => {
      res.status(200).json('video created');
    });
  }
}

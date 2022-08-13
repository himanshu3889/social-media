import type { NextApiRequest, NextApiResponse } from "next";

import { allVideosQuery } from "../../../utils/queries";
import { client } from "../../../configs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const videosQuery = allVideosQuery();
    const data = await client.fetch(videosQuery);
    res.status(200).json(data);
}
}
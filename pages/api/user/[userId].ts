import type { NextApiRequest, NextApiResponse } from "next";
import { singleUserQuery } from "../../../utils/queries";
import { client } from "../../../configs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId }: any = req.query;

    const userDetailsQuery = singleUserQuery(userId);
    const user = await client.fetch(userDetailsQuery);

    const data = { user: user };
    res.status(200).json(data);
  } else if (req.method === "PUT") {
    const { userId }: any = req.query;
    const { userName, relationship, city, country }: any = req.body;

    const data = await client
      .patch(userId)
      .setIfMissing({userName, city, country, relationship})
      .set({
        userName: userName,
        city: city,
        country: country,
        relationship: relationship,
      })
      .commit();

    res.status(200).json(data);
  }
}

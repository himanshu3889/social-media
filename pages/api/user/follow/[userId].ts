import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../../configs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId }: any = req.query;
    const { followerId, isFollowing } = req.body;
    
    // add/remove follower from mainUser followers
    const mainUserData = isFollowing
      ? await client
          .patch(userId)
          .unset([`followers[_ref=="${followerId}"]`])
          .commit()
      : await client
          .patch(userId)
          .setIfMissing({ followers: [] })
          .insert("after", "followers[-1]", [
            {
              _key: uuid(),
              _ref: followerId,
            },
          ])
          .commit();
    
    // add/remove following from follower followings
    const followerUserData = isFollowing
      ? await client
          .patch(followerId)
          .unset([`followings[_ref=="${userId}"]`])
          .commit()
      : await client
          .patch(followerId)
          .setIfMissing({ followings: [] })
          .insert("after", "followings[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit();

    res.status(200).json(mainUserData);
  }
}

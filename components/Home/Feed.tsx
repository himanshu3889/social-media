import React, { useEffect, useState } from "react";
import { IUser, IPost } from "../../types";
import Post from "./Post";
import useAuthStore from "../../store/authStore";
import noAvatar from "../../public/noAvatar.png";
import Link from "next/link";
import NoResults from "../NoResults";

interface IProps {
  posts: IPost[];
  userId: string;
}

const Feed = ({ posts, userId }: IProps) => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="w-full px-1 md:px-4">
      {/* <PostForm/> */}
      {user && user?._id == userId && (
        <div className="px-4 mt-4 shadow-lg shadow-gray-300 bg-blue-400 rounded-lg transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-blue-700 ">
          <div className="p-2 flex space-x-4">
            <img
              src={user.image || noAvatar.src}
              alt="avatar "
              className="object-cover w-12 h-12 rounded-full border-2 border-gray-200"
            />

            <div className="w-1 flex justify-between flex-1 p-2 text-white font-semibold ">
              <div>
                What's On Your mind{" "}
                <span className="ml-1 font-bold text-lg">{user.userName}</span>
              </div>
              <div>
                <Link href="/upload">
                  <button className="bg-green-400 p-2 px-4 sm:px-6 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-white">
                    Post
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} postDetails={post} />)
        ) : (
          <NoResults text="No Posts Available" />
        )}
      </div>
    </div>
  );
};

export default Feed;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Feed from "../components/Home/Feed";
import LeftSideBar from "../components/Home/LeftSidebar";
import RightSidebar from "../components/Home/RightSidebar";
import useAuthStore from "../store/authStore";
import { IPost } from "../types";



export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IProps {
  posts: IPost[];
}

const Home = ({ posts }: IProps) => {
  const { userProfile, allUsers, fetchAllUsers }: any = useAuthStore();
  const [followingUsers, setFollowingUsers] = useState([] as any);

  useEffect(() => {
    fetchAllUsers();
    const findFollowingUsers = async () => {
      if (userProfile) {
        const res = await axios.get(`${BASE_URL}/api/user/${userProfile._id}`);
        setFollowingUsers(res.data.user.followings);
      }
    };
    findFollowingUsers();
  }, [userProfile]);

  return (
    <div className="h-[92vh]">
      <div className="flex h-full">
        {/* <!-- LeftSidbar --> */}
        <div className="w-1/4 border flex flex-col">
          <div className="flex-1 overflow-auto ">
            <LeftSideBar allUsers={allUsers} followingUsers={followingUsers} />
          </div>
        </div>

        {/* <!-- Feed --> */}
        <div className="w-full md:w-2/4 border flex flex-col">
          <div className="flex-1 overflow-auto  ">
            <Feed posts={posts} userId={userProfile?._id || 0} />
          </div>
        </div>

        {/* <!-- RightSidebar --> */}
        <div className="w-1/4 border hidden md:flex flex-col">
          <div className="flex-1 overflow-auto ">
            <RightSidebar allUsers={allUsers} followingUsers={followingUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({query: { topic }}: {query: { topic: string };}) => 
{

  let response = !topic
    ? await axios.get(`${BASE_URL}/api/post`)
    : await axios.get(`${BASE_URL}/api/discover/${topic}`);

  return {
    props: { posts: response.data },
  };
};

export default Home;

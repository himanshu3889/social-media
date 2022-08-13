import axios from "axios";
import React from "react";
import { BASE_URL } from "..";
import Post from "../../components/Home/Post";
import NoResults from "../../components/NoResults";
import { IPost } from "../../types";

interface IProps {
  posts: IPost[];
}

const videos = ({ posts }: IProps) => {
  return (
    <div className="h-[92vh]">
      <div className="flex h-full bg-gray-100">
        <div className="w-full md:w-2/4 mx-auto border flex flex-col">
          <div className="flex-1 overflow-auto ">
            <div className="flex justify-center gap-20 border-b-2 border-gray-600 md:sticky top-0 z-50 bg-gray-300 w-full">
              <p className="text-xl text-blue-500 font-bold cursor-pointer p-2">
                Videos
              </p>
            </div>
            {posts.length > 0 ? (
              posts.map((post) => <Post key={post._id} postDetails={post} />)
            ) : (
              <NoResults text="No Post Available" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let response = await axios.get(`${BASE_URL}/api/post/videos`);

  return {
    props: { posts: response.data },
  };
};

export default videos;

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import NoResults from "../../components/NoResults";
import { IUser, IPost } from "../../types";
import Post from "../../components/Home/Post";
import { BASE_URL } from "..";

interface IProps {
  posts: IPost[];
  accounts: IUser[];
}

const Search = ({ posts, accounts }: IProps) => {
  const [isPosts, setIsPosts] = useState(false);

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accountsStyle = !isPosts ? "border-b-2 border-blue-600" : "text-gray-400";
  const postsStyle = isPosts ? "border-b-2 border-blue-600" : "text-gray-400";

  return (
    <div className="h-[92vh]">
      <div className="flex h-full bg-gray-100">
        <div className="w-full md:w-2/4 mx-auto border flex flex-col">
          <div className="flex-1 overflow-auto ">
            <div className="flex justify-center gap-20 border-b-2 border-gray-200 md:sticky top-0 z-50 bg-white w-full">
              <p
                onClick={() => setIsPosts(false)}
                className={`text-xl  font-semibold cursor-pointer ${accountsStyle} p-2`}
              >
                Accounts
              </p>
              <p
                className={`text-xl font-semibold cursor-pointer ${postsStyle} p-2`}
                onClick={() => setIsPosts(true)}
              >
                Posts
              </p>
            </div>
            {!isPosts ? (
              <div className="md:mt-16">
                {accounts.length > 0 ? (
                  accounts.map((user: IUser, idx: number) => (
                    <Link key={idx} href={`/profile/${user._id}`}>
                      <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-400 bg-blue-100">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="user-profile"
                            src={user.image}
                          />
                        </div>
                        <div>
                          <div>
                            <p className="flex gap-1 items-center text-lg font-bold text-primary">
                              {user.userName}
                            </p>
                            <p className="capitalize text-gray-400 text-sm">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <NoResults text={`No Account Results for ${searchTerm}`} />
                )}
              </div>
            ) : posts.length > 0 ? (
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

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { posts: res.data.posts, accounts: res.data.accounts },
  };
};

export default Search;

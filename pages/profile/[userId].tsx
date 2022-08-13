import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Feed from "../../components/Home/Feed";
import { BASE_URL } from "..";
import { IUser, IPost } from "../../types";
import useAuthStore from "../../store/authStore";
import noAvatar from "../../public/noAvatar.png";
import User from "../../components/Profile/User";

interface IProps {
  user: IUser;
  posts: IPost[];
}

const Profile = ({ user, posts }: IProps) => {
  const { userProfile, allUsers, fetchAllUsers }: any = useAuthStore();
  const [followingUsers, setFollowingUsers] = useState([] as any);
  const [followerUsers, setFollowerUsers] = useState([] as any);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userRelationship, setUserRelationship] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");
  const [isContentEditable, setIsContentEditable] = useState<boolean>(false);
  const userNameRef = useRef<HTMLSpanElement>(null);
  const userCityRef = useRef<HTMLSpanElement>(null);
  const userCountryRef = useRef<HTMLSpanElement>(null);


  useEffect(() => {
    fetchAllUsers();
    if (user) {
      setFollowingUsers(user.followings);
      setFollowerUsers(user.followers);
      setUserName(user.userName);
      setUserRelationship(user.relationship);
      setUserCity(user.city);
      setUserCountry(user.country);
      setIsContentEditable(false)
    }
  }, [user]);

  useEffect(() => {
    if (userProfile) {
      const isAlreadyFollowing = followerUsers?.some(
        (item: any, idx: number) => item._ref === userProfile._id
      );
      setIsFollowing(isAlreadyFollowing);
    }
  }, [userProfile?._id, followerUsers]);

  const handleFollowing = async () => {
    if (userProfile && userProfile._id !== user._id) {
      const res = await axios.put(`${BASE_URL}/api/user/follow/${user._id}`, {
        followerId: userProfile._id,
        isFollowing,
      });
      setFollowerUsers(res.data.followers);
    }
  };

  const handleCancelSubmitUserDetails = async () => {
    setIsContentEditable(false);
  };

  const handleSubmitUserDetails = async () => {
    setIsContentEditable(false);
    let user_name = userNameRef?.current?.innerText.trim();
    let user_city = userCityRef?.current?.innerText.trim();
    let user_country = userCountryRef?.current?.innerText.trim();

    let userData = {
      userName: user_name,
      relationship: userRelationship,
      city: user_city,
      country: user_country,
    };
    const res = await axios.put(`/api/user/${user._id}`, userData);
  };

  return (
    <div className="h-[92vh]">
      <div className="flex h-full md:flex-row flex-col overflow-auto">
        {/* Left Side */}
        <div className="md:w-1/2 w-full flex-1 flex-col md:overflow-auto xl:border-r-2">
          <div className="bg-white p-4">
            <div className="flex flex-col gap-1 text-center items-center">
              <img
                className="h-32 w-32 bg-gray-200 p-2 rounded-full shadow mb-4"
                src={user?.image || noAvatar.src}
                alt=""
              />

              <div>
                <span
                  className={`font-bold text-xl p-0.5 ${
                    isContentEditable ? "border-2 border-red-600" : null
                  }`}
                  contentEditable={isContentEditable}
                  suppressContentEditableWarning={true}
                  ref={userNameRef}
                >
                  {user?.userName}
                </span>
                {userProfile && userProfile._id !== user._id && (
                  <button
                    onClick={handleFollowing}
                    className={`ml-4 text-white ${
                      isFollowing
                        ? "bg-red-500 ring-red-500"
                        : "bg-blue-500 ring-blue-500"
                    } px-2 py-1 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 `}
                  >
                    {isFollowing ? "UnFollow" : "Follow +"}
                  </button>
                )}
                {userProfile &&
                  userProfile._id === user._id &&
                  (!isContentEditable ? (
                    <i
                      className="ml-4 fa-solid fa-pen-to-square text-2xl text-gray-300 hover:text-red-800 cursor-pointer"
                      onClick={() => setIsContentEditable(true)}
                    ></i>
                  ) : (
                    <span>
                      <i
                        className="ml-4 fa-solid fa-circle-check text-2xl text-green-400 hover:text-green-800 cursor-pointer"
                        onClick={handleSubmitUserDetails}
                      ></i>
                      <i
                        className="ml-4 fa-solid fa-xmark text-2xl text-red-400 hover:text-red-800 cursor-pointer"
                        onClick={handleCancelSubmitUserDetails}
                      ></i>
                    </span>
                  ))}
              </div>

              <div>
                <i className="fa-solid fa-heart text-gray-400 mr-2"></i>
                <span className="font-semibold text-sm text-gray-400">
                  Relationship :{" "}
                </span>
                {!isContentEditable ? (
                  <span className="font-normal text-sm text-gray-400">
                    {userRelationship}
                  </span>
                ) : (
                  <span className="font-normal text-sm text-gray-400 border-2 border-red-600">
                    <select
                      onChange={(e) => {
                        setUserRelationship(e.target.value);
                      }}
                    >
                      <option
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value="None"
                        selected
                      >
                        None
                      </option>
                      <option
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value="Single"
                      >
                        Single
                      </option>
                      <option
                        className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                        value="Married"
                      >
                        Married
                      </option>
                    </select>
                  </span>
                )}
              </div>
              <div>
                <i className="fa-solid fa-location-dot mr-2 text-gray-400"></i>
                <span>
                  <span
                    className={`font-normal text-sm text-gray-400 p-0.5 ${
                      isContentEditable ? "border-2 border-red-600" : null
                    }`}
                    contentEditable={isContentEditable}
                    suppressContentEditableWarning={true}
                    ref={userCityRef}
                  >
                    {userCity}
                  </span>
                  {","}
                  <span
                    className={`font-normal text-sm text-gray-400 p-0.5 ${
                      isContentEditable ? "border-2 border-red-600" : null
                    }`}
                    contentEditable={isContentEditable}
                    suppressContentEditableWarning={true}
                    ref={userCountryRef}
                  >
                    {userCountry}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 my-3">
              <div className="font-semibold text-center mx-4">
                <p className="text-black">{posts?.length}</p>
                <span className="text-gray-400">Posts</span>
              </div>
              <div className="font-semibold text-center mx-4">
                <p className="text-black">{user?.followers?.length || 0}</p>
                <span className="text-gray-400">Followers</span>
              </div>
              <div className="font-semibold text-center mx-4">
                <p className="text-black">{user?.followings?.length || 0}</p>
                <span className="text-gray-400">Folowings</span>
              </div>
            </div>
          </div>
          <p className="border-b border-gray-200 mt-2"></p>

          {/* Following */}
          <div className="bg-white my-2 p-2">
            <h3 className="text-gray-600 font-bold mb-4">Following</h3>
            <div className="flex overflow-x-auto w-full mx-auto ">
              <div className="flex py-3 px-3">
                {followingUsers &&
                  followingUsers?.map((item: any, idx: number) => (
                    <div key={idx}>
                      {allUsers?.map(
                        (user: IUser) =>
                          user._id === item._ref && (
                            <User key={user._id} user={user} />
                          )
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <p className="border-b border-gray-200  mt-2"></p>

          {/* Followers */}
          <div className="bg-white my-2 p-2">
            <h3 className="text-gray-600 font-bold mb-4">Followers</h3>
            <div className="flex overflow-x-auto w-full mx-auto ">
              <div className="flex py-2 px-3 gap-5">
                {followerUsers &&
                  followerUsers?.map((item: any, idx: number) => (
                    <div key={idx}>
                      {allUsers?.map(
                        (user: IUser) =>
                          user._id === item._ref && (
                            <User key={user._id} user={user} />
                          )
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <p className="flex md:hidden border-b border-gray-200  mt-2"></p>

        {/* Right Side */}
        <div className="md:w-1/2 w-full flex-1 flex-col md:overflow-auto ">
          <Feed posts={posts} userId={user?._id || "0"} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: {
      user: res.data.user,
      posts: res.data.posts,
    },
  };
};
export default Profile;

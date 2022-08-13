import React from "react";
import Link from "next/link";
import User from "./User";
import { IUser } from "../../types";
import useAuthStore from "../../store/authStore";
import noAvatar from "../../public/noAvatar.png";

interface IProps {
  followingUsers: IUser[];
  allUsers: IUser[];
}

const LeftSideBar = ({ allUsers, followingUsers }: IProps) => {
  const { userProfile }: any = useAuthStore();

  console.log(allUsers);
  console.log(followingUsers);

  return (
    <div className="flex-col">
      <div className="p-4">
        {userProfile && (
          <div>
            <Link href={`/profile/${userProfile._id}`}>
              <div className="flex items-center space-x-2 p-2 rounded-lg transition-all cursor-pointer">
                <img
                  src={userProfile?.image || noAvatar.src}
                  alt="avatar"
                  className="object-cover w-10 h-10 rounded-full"
                />
                <span className="font-semibold break-all hidden md:block">
                  {userProfile?.userName}
                </span>
              </div>
            </Link>
          </div>
        )}

        <div className="border-b border-gray-200 m-2"></div>

        <div>
          <Link href="#">
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-200 rounded-lg transition-all">
              <i className="fa-solid fa-user-group text-blue-500 text-lg"></i>
              <span className="font-semibold hidden md:block">Friends</span>
            </div>
          </Link>
        </div>
        <div>
        </div>
        <div>
          <Link href="/post/videos">
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-200 rounded-lg transition-all cursor-pointer ">
              <i className="fa-solid fa-clapperboard text-red-500 text-lg"></i>
              <span className="font-semibold hidden md:block">Videos</span>
            </div>
          </Link>
        </div>
        <div>
          <Link href="#">
            <div className="flex items-center space-x-2 p-2 hover:bg-blue-200 rounded-lg transition-all ">
              <i className="fa-solid fa-people-group text-sky-500 text-lg"></i>
              <span className="font-semibold hidden md:block">Groups</span>
            </div>
          </Link>
        </div>
        <div className="border-b border-gray-200 m-2"></div>
      </div>

      <div className="flex justify-between items-center px-4 h-4 group">
        {userProfile ? (
          <span className="font-semibold text-gray-500 text-lg hidden md:block ">
            People You May Know
          </span>
        ) : (
          <span className="font-semibold text-gray-500 text-lg ">Users</span>
        )}
      </div>
      <div className="p-4 flex-col overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {userProfile
          ? followingUsers?.length > 0
            ? allUsers?.map((user: IUser, idx: number) => (
                <div key={idx}>
                  {followingUsers?.map(
                    (item: any) =>
                      user?._id !== userProfile?._id &&
                      user?._id !== item?._ref && (
                        <User key={user?._id} user={user} />
                      )
                  )}
                </div>
              ))
            : allUsers?.map(
                (user: IUser, idx: number) =>
                  user?._id !== userProfile?._id && (
                    <User key={user?._id} user={user} />
                  )
              )
          : allUsers?.map((user: IUser, idx: number) => (
              <User key={user?._id} user={user} />
            ))}
      </div>
    </div>
  );
};

export default LeftSideBar;

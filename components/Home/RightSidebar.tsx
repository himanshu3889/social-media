import React from "react";
import useAuthStore from "../../store/authStore";
import { IUser } from "../../types";
import User from "./User";

interface IProps {
  followingUsers: IUser[];
  allUsers: IUser[];
}

const RightSidebar = ({ allUsers, followingUsers }: IProps) => {
  const { userProfile }: any = useAuthStore();
  return (
    <div className="h-full px-4 ">
      {/* <!-- Following --> */}
      <div className="flex justify-between items-center px-4 pt-4 text-gray-500 ">
        <span className="font-semibold text-lg">
          Following
          <i className="fa-solid fa-address-book text-green-500 text-lg mx-2" />
        </span>
      </div>
      {userProfile && (
        <div className="p-4 flex-col overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
      )}
    </div>
  );
};

export default RightSidebar;

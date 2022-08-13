import React from "react";
import { IUser } from "../../types";
import noAvatar from "../../public/noAvatar.png";
import Link from "next/link";

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps) => {
  return (
    <Link href={`/profile/${user._id}`}>
      <div className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-blue-100">
        <div className="relative">
          <img
            src={user?.image || noAvatar.src}
            alt="avatar "
            className="object-cover w-10 h-10 border-2 border-gray-400 rounded-full"
          />
        </div>
        <div className="flex-1 break-all hidden md:block">{user?.userName}</div>
      </div>
    </Link>
  );
};

export default User;

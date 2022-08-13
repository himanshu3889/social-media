import React from "react";
import { IUser } from "../../types";
import noAvatar from "../../public/noAvatar.png";
import Link from "next/link";

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps) => {
  return (
    <Link href={`/profile/${user?._id}`}>
      <div className="flex flex-col items-center justify-center px-4 cursor-pointer transition duration-500 ease-in-out hover:bg-blue-200">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src={user?.image || noAvatar.src}
        />
        <span className="text-sm text-gray-500">{user?.userName}</span>
      </div>
    </Link>
  );
};

export default User;

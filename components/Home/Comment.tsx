import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { IUser } from "../../types";

interface IComment {
  comment: string;
  createdAt: Date;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string  };
}

interface IProps{
  commentDetails:IComment;
  user : IUser;
}

export default function Comment({ user,commentDetails }: IProps) {
  return (
    <div className="flex flex-row p-2 pl-6 ">
      <Link href={`/profile/${user?._id}`}>
        <img
          className="object-cover w- h-10 border-2 border-gray-300 rounded-full cursor-pointer"
          alt="avatar"
          src={user?.image}
        />
      </Link>
      <div className="flex-col mt-0.5">
        <div className="flex flex-row">
          <Link href={`/profile/${user?._id}`}>
            <div className="text-center text-sm px-2 font-semibold leading-tight text-ellipsis overflow-hidden cursor-pointer">
              {user?.userName}
            </div>
          </Link>
          <span className="ml-2 p-1 text-xs font-normal text-gray-500">
            <Moment fromNow>{commentDetails?.createdAt}</Moment>
          </span>
        </div>
        <div className="flex-1 break-all ml-2 text-sm font-medium leading-normal text-gray-600">
          {commentDetails?.comment}
        </div>
      </div>
    </div>
  );
}

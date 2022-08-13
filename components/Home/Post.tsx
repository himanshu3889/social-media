import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { IUser, IPost } from "../../types";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../pages";
import Link from "next/link";


interface IProps {
  postDetails: IPost;
}

interface IComment {
  comment: string;
  createdAt: Date;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string;  };
} 

const Post = ({postDetails}:IProps)=> {
  const [post, setPost] = useState(postDetails);
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { userProfile, allUsers }: any = useAuthStore();
  const videoFileTypes = ["video/mp4", "video/webm", "video/ogg"];
  const fileType = videoFileTypes.includes(postDetails?.file?.asset?.mimeType) ? "video" : "image"

  useEffect(() => {
    let isAlreadyLiked = post.likes?.some(
      (item: any) => item._ref === userProfile?._id
    );
    setIsLiked(isAlreadyLiked);
  }, [userProfile?._id, post.likes]);


  const handleLike = async () => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/post/like`, {
        userId: userProfile._id,
        postId: post._id,
        isLiked,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  return (
    <div className="shadow-lg shadow-gray-400 bg-white  my-4 rounded-lg">
      {/* <!-- POST AUTHOR --> */}
      <div className="flex items-center justify-between px-4 py-4">
        <Link href={`/profile/${postDetails?.postedBy?._id}`}>
          <div className="flex space-x-2 items-center cursor-pointer">
            <div className="relative shrink-0">
              <img
                src={postDetails?.postedBy?.image}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-full "
              />
            </div>
            <div className="font-bold leading-tight text-gray-800 text-ellipsis overflow-hidden">
              {post.postedBy?.userName}
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500 mr-4">
            <Moment fromNow>{post?.createdAt}</Moment>
          </span>
          <i className="fa-solid fa-ellipsis-vertical mx-2 text-gray-600 text-2xl cursor-pointer hover:text-3xl"></i>
        </div>
      </div>

      {/* <!-- POST CONTENT --> */}
      <div className="flex-1 px-2 pb-2 ml-2 font-medium leading-relaxed text-gray-600">
        {post?.description}
      </div>

      {/* <!-- POST File --> */}
      <div className="p-2 flex justify-center items-center border-y">
        {fileType === "video" ? (
          <video
            className="object-fill w-full h-80 rounded"
            controls
            src={postDetails?.file?.asset?.url}
          />
        ) : (
          <img
            src={postDetails?.file?.asset?.url}
            alt="IPost image"
            className="object-fill w-full h-80 rounded"
          />
        )}
      </div>

      {/* <!-- POST REACT --> */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mx-2">
          <div className="flex flex-row items-center">
            <div>
              <i
                className={`fa-heart hover:text-red-500 text-2xl cursor-pointer ${
                  !userProfile ? "cursor-not-allowed" : null
                }
              ${isLiked ? "fa-solid text-red-600" : "fa-regular"}`}
                onClick={handleLike}
              />
              <span className="ml-1 text-gray-500  cursor-default">
                {post?.likes?.length || 0}
              </span>
            </div>

            <div className="ml-5">
              <i
                className={`fa-comment-dots hover:text-blue-500 text-2xl cursor-pointer
              ${isShowingComments ? "fa-solid text-blue-600" : "fa-regular"}`}
                onClick={() => setIsShowingComments(!isShowingComments)}
              />
              <span
                typeof="button"
                className="ml-1 text-gray-500  cursor-default"
              >
                {post?.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <CommentForm post={post} setPost={setPost} />
      <div className="py-2" />

      {/* <!-- LIST COMMENT --> */}
      {isShowingComments &&
        post.comments?.length > 0 &&
        post.comments?.map((item: IComment, idx: number) => (
          <div key={idx}>
            {allUsers?.map(
              (user: IUser) =>
                user._id === (item.postedBy._ref || item.postedBy._id) && (
                  <Comment key={item._key} user={user} commentDetails={item} />
                )
            )}
          </div>
        ))}
    </div>
  );
}

export default Post;
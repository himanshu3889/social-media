import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../pages";
import useAuthStore from "../../store/authStore";
import { IPost } from "../../types";

interface IProps {
  post: IPost;
  setPost: any;
}

const CommentForm = ({ post, setPost }: IProps) => {
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { userProfile }: any = useAuthStore();

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  return (
    <form
      onSubmit={addComment}
      className="flex-1 flex mx-2 px-4 bg-gray-100 border border-gray-200 rounded-full focus-within:border-blue-500 "
    >
      <input
        type="text"
        className={`w-1 outline-none bg-transparent flex-1 m-1.5 ${
          !userProfile ? "cursor-not-allowed" : null
        }`}
        value={comment}
        onChange={(e) => setComment(e.target.value.trimStart())}
        placeholder="Write a comment..."
        hidden={!userProfile}
        disabled={!userProfile}
      />
      {!isPostingComment ? (
        <button
          disabled={isPostingComment}
          onClick={addComment}
          hidden={!userProfile}
        >
          <i className="fa-solid fa-paper-plane text-2xl text-emerald-400 hover:text-emerald-600"></i>
        </button>
      ) : (
        <i className="fas fa-circle-notch fa-spin text-xl text-green-700 m-1"></i>
      )}
    </form>
  );
};

export default CommentForm ;
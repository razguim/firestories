import React, { useState } from "react";
import { useDownvoteStoryMutation } from "../../slices/storiesApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function DownvoteButton({ downvoted, storyId, size }) {
  const [isDownvoted, setIsDownvote] = useState(downvoted);
  const [downvoteStory, { isLoading }] = useDownvoteStoryMutation(storyId);
  const handleDownvotes = async () => {
    try {
      const res = await downvoteStory(storyId).unwrap();
      setIsDownvote(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <button
        onClick={handleDownvotes}
        className={`${
          isDownvoted
            ? "bg-neutral-700 hover:bg-neutral-600"
            : "bg-neutral-600 hover:bg-neutral-700"
        } transition-colors duration-500 text-neutral-400 px-4 py-2 rounded-full flex justify-between items-center gap-2`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <span className="material-symbols-rounded">thumb_down</span>
            <span className="text-xl">{size}</span>
          </>
        )}
      </button>
    </>
  );
}

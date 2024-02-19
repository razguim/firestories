import React, { useState } from "react";
import { useUpvoteStoryMutation } from "../../slices/storiesApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function UpvoteButton({ upvoted, storyId, size }) {
  const [isUpvoted, setIsUpvoted] = useState(upvoted);
  const [upvoteStory, { isLoading }] = useUpvoteStoryMutation(storyId);
  const handleUpvotes = async () => {
    try {
      const res = await upvoteStory(storyId).unwrap();
      setIsUpvoted(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <button
        onClick={handleUpvotes}
        className={`${
          isUpvoted
            ? "bg-orange-600 text-orange-300 hover:bg-neutral-600 hover:text-neutral-400"
            : "bg-neutral-600 hover:bg-orange-600"
        } transition-colors duration-200  px-4 py-2 rounded-full flex justify-between items-center gap-2`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <span className="text-xl">{size}</span>
            <span className="material-symbols-rounded">thumb_up</span>
          </>
        )}
      </button>
    </>
  );
}

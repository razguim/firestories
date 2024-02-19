import React, { useState } from "react";
import { useFollowUnfollowUserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
export default function FollowButton({ followed,username }) {
  const [isFollowed, setIsFollowed] = useState(followed);
  const [followUnfollowUser] = useFollowUnfollowUserMutation(
    username
  );
  const followHandler = async () => {
    try {
      const res = await followUnfollowUser(username).unwrap();
      setIsFollowed(res);
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <button
      onClick={followHandler}
      className="py-1 px-5 bg-orange-400 hover:bg-orange-600 rounded-lg flex items-center gap-2"
    >
      {isFollowed ? (
        <>
          <span className="material-symbols-rounded">person_remove</span>
          Unfollow
        </>
      ) : (
        <>
          <span className="material-symbols-rounded">person_add</span>Follow
        </>
      )}
    </button>
  );
}

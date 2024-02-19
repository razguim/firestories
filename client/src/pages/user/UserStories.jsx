import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByUserNameQuery } from "../../slices/usersApiSlice";
import MessageAlert from "../../components/common/MessageAlert";
import StoryDetailsCard from "../../components/common/StoryDetailsCard";
import SkeltonLoader from "../../components/common/SkeltonLoader";
import StoryFormModal from "../../components/common/StoryCreateModal";
import { useSelector } from "react-redux";

export default function UserStories() {
  const { userData } = useSelector((state) => state.auth);
  const { username } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByUserNameQuery(username);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {isLoading ? (
        <SkeltonLoader />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : ((user.stories.length == 0 ) ? (
        <p className="mt-4 p-2 border border-white rounded-lg bg-neutral-800">
            {user.username} haven't post any stories yet. 
        </p>
      ):(
        <>
          {user?.stories.map((story) => (
            <StoryDetailsCard  key={story._id} story={story} />
          ))}
        </>))}

    </>
  );
}

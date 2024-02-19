import React from "react";
import { useGetUserByUserNameQuery } from "../../slices/usersApiSlice";
import Spinner from "../../components/common/Spinner";
import FollowCard from "../../components/common/FollowCard";
import { useParams } from "react-router-dom";
import MessageAlert from "../../components/common/MessageAlert";

export default function Followers() {
    const { username } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByUserNameQuery(username);
  return (
    <>
    {isLoading ? (
        <Spinner fullpage/>
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : ((user.followers.length == 0) ? (
        
        <MessageAlert isInfo={true}>
        {user.username} have 0 followers
      </MessageAlert>
      ):(
        <section className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-col-4">
          {user?.followers.map((follow) => (
            <FollowCard key={follow._id} follow={follow} />
          ))}
        </section>))}
    </>
  );
}

import React from "react";
import { useGetUserByUserNameQuery } from "../../slices/usersApiSlice";
import Spinner from "../../components/common/Spinner";
import { Link, useParams } from "react-router-dom";
import MessageAlert from "../../components/common/MessageAlert";
import StoryCard from "../../components/common/StoryCard";

export default function Favorites() {
  const { username } = useParams();
  const { data: user, isLoading, error } = useGetUserByUserNameQuery(username);
  return (
    <>
      {isLoading ? (
        <Spinner fullpage/>
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : user.favorites.length == 0 ? (
        <MessageAlert isInfo={true}>
          {user.username} haven't favorited any story
        </MessageAlert>
      ) : (
        <section className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-col-4">
          {user?.favorites.map((story) => (
            <Link key={story._id} to={`/story/${story._id}`}>
              <StoryCard story={story} />
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

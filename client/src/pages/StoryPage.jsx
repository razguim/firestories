import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetStoryQuery } from "../slices/storiesApiSlice";
import MessageAlert from "../components/common/MessageAlert";
import Spinner from "../components/common/Spinner";
import { useSelector } from "react-redux";
import FavoriteButton from "../components/common/FavoriteButton";
import UpvoteButton from "../components/common/UpvoteButton";
import DownvoteButton from "../components/common/DownvoteButton";
import StoryDeleteModal from "../components/common/StoryDeleteModal";
export default function StoryPage() {
  const [showModal, setShowModal] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const { id: storyId } = useParams();
  const { data: story, isLoading, error } = useGetStoryQuery(storyId);
  return (
    <section className="h-full justify-center items-center">
      {isLoading ? (
        <Spinner fullpage />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : (
        <>
          <article className="border border-neutral-700 rounded-t-md relative">
            <img
              className="aspect-video object-cover w-full rounded-t-md "
              src={story.cover}
              alt={story.title}
            />
            <header className="p-2 absolute top-0">
              <div className="flex justify-between items-center gap-2">
                <img
                  className="size-12 rounded-full shadow-xl"
                  src={story.postedBy?.avatar}
                  alt={story.postedBy?.username}
                />
                <div className="flex flex-col font-bold">
                  <span className="drop-shadow-lg">{story.title}</span>
                  <span className="drop-shadow-lg">
                    <Link to={`/user/${story.postedBy?.username}`}>
                      {story.postedBy?.username}
                    </Link>
                  </span>
                </div>
              </div>
              
            </header>
            <p className="text-sm md:text-base p-4 bg-neutral-800">
              {story.content}
            </p>

            <footer className="flex justify-start items-center gap-2 p-2">
              {(userData._id === story.postedBy?._id || userData.isMod) ? (
                <>
                  <Link
                    to={`/story/edit/${story._id}`}
                    className="bg-neutral-600 px-4 py-2 rounded-full hover:bg-neutral-500 flex items-center gap-2"
                  >
                    <span className="material-symbols-rounded">edit</span>Edit
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full hover:bg-red-600"
                  >
                    <span className="material-symbols-rounded">delete</span>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <UpvoteButton
                    storyId={storyId}
                    upvoted={Boolean(story.upvotes[userData._id])}
                    size={Object.keys(story.upvotes).length}
                  />
                  <DownvoteButton
                    storyId={storyId}
                    downvoted={Boolean(story.downvotes[userData._id])}
                    size={Object.keys(story.downvotes).length}
                  />
                  <FavoriteButton
                    storyId={storyId}
                    favorited={Boolean(story.favorited[userData._id])}
                  />
                </>
              )}
            </footer>
          </article>
          {showModal && (
            <StoryDeleteModal
              storyId={storyId}
              storyTitle={story.title}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </section>
  );
}

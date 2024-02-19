import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import StoryDeleteModal from "./StoryDeleteModal";
import StoryReportModal from "./ReportStoryModal";
import ReportStoryButton from "./ReportStoryButton";
export default function StoryDetailsCard({ story }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  return (
    <>
      <article className="border border-neutral-700 rounded-t-md relative my-4">
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
              <span className="drop-shadow-lg">
                <Link to={`/story/${story._id}`}>{story.title}</Link>
              </span>
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

        <footer className="flex justify-between items-center gap-2 p-2">
          {userData._id === story.postedBy?._id || userData?.isMod ? (
            <>
              <Link
                to={`/story/edit/${story._id}`}
                className="bg-neutral-600 px-4 py-2 rounded-full hover:bg-neutral-500 flex items-center gap-2"
              >
                <span className="material-symbols-rounded">edit</span>Edit
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full hover:bg-red-600"
              >
                <span className="material-symbols-rounded">delete</span>
                Delete
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-start items-center space-x-2">
                <UpvoteButton
                  storyId={story._id}
                  upvoted={Boolean(story.upvotes[userData._id])}
                  size={Object.keys(story.upvotes).length}
                />
                <DownvoteButton
                  storyId={story._id}
                  downvoted={Boolean(story.downvotes[userData._id])}
                  size={Object.keys(story.downvotes).length}
                />
                <FavoriteButton
                  storyId={story._id}
                  favorited={Boolean(story.favorited[userData._id])}
                />
              </div>
              <ReportStoryButton storyId={story._id} storyTitle={story.title} />
            </>
          )}
        </footer>
      </article>
      {showDeleteModal && (
        <StoryDeleteModal
          storyId={story._id}
          storyTitle={story.title}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

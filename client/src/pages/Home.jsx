import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetStoriesQuery } from "../slices/storiesApiSlice";
import defaultAvatar from "../assets/defaultAvatar.jpg";
import SkeltonLoader from "../components/common/SkeltonLoader";
import Paginate from "../components/common/Paginate";
import SearchBox from "../components/common/SearchBox";
import MessageAlert from "../components/common/MessageAlert";
import StoryDetailsCard from "../components/common/StoryDetailsCard";
import StoryCreateModal from "../components/common/StoryCreateModal";

export default function Home() {
  const { searchQuery, pageNumber } = useParams();
  const { userData } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetStoriesQuery({
    searchQuery,
    pageNumber,
  });

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <section className="mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-2 ">
        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-full flex items-center gap-2 bg-orange-600"
        >
          <img
            src={userData?.avatar ?? defaultAvatar}
            alt={`${userData.firstname} ${userData.lastname}`}
            className="size-5 md:size-9 rounded-full object-cover"
          />
          <span className="flex justify-between items-center">
            <span className="material-symbols-rounded">add</span>
            <span className="text-sm md:text-base">Tell us a story</span>
          </span>
        </button>
        <SearchBox />
        {showModal && <StoryCreateModal onClose={() => setShowModal(false)} />}
      </section>
      {searchQuery && (
        <section className="my-4">
          <Link
            to="/"
            className="px-4 py-2 bg-transparent rounded-md hover:bg-orange-600"
          >
            Return
          </Link>
        </section>
      )}
      {isLoading ? (
        <SkeltonLoader />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : (
        <>
            {data.stories.map((story) => (
                <StoryDetailsCard key={story._id} story={story} />
            ))}
          <Paginate
            pages={data.pages}
            page={data.page}
            searchQuery={searchQuery ? searchQuery : ""}
            routePath={''}
          />
        </>
      )}
    </>
  );
}

import { Link, useLocation, useParams } from "react-router-dom";
import { useGetFavoriteStoriesQuery } from "../slices/storiesApiSlice";
import SkeltonLoader from "../components/common/SkeltonLoader";
import Paginate from "../components/common/Paginate";
import MessageAlert from "../components/common/MessageAlert";
import StoryDetailsCard from "../components/common/StoryDetailsCard";

export default function FavoritesFeed() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetFavoriteStoriesQuery({
    pageNumber,
  });
  return (
    <>
      {isLoading ? (
        <SkeltonLoader />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : (
        <>
          {data.message ? (
            <MessageAlert isInfo={true}>{data.message}</MessageAlert>
          ) : (
            data?.favoriteStories.map((story) => (
              <StoryDetailsCard key={story._id} story={story} />
            ))
          )}

          <Paginate pages={data.pages} routePath={"/favorites"} />
        </>
      )}
    </>
  );
}

import { Link, useParams } from "react-router-dom";
import StoryCard from "../src/components/common/StoryCard";
import SkeltonLoader from "../src/components/common/SkeltonLoader";
import MessageAlert from "../src/components/common/MessageAlert";
import { useGetFeedStoriesQuery } from "../src/slices/storiesApiSlice";

export default function FavoritesFeed() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetFeedStoriesQuery({
    pageNumber,
  });
  return (
    {isLoading ? ("") : error ? ("") : ("")}
    <>
      <section className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-col-4">
        {data.feedstories.map((story) => (
          <Link key={story._id} to={`/story/${story._id}`}>
            <StoryCard story={story} />
          </Link>
        ))}
      </section>
      <Paginate pages={data.pages} page={data.page} />
    </>
  );
}

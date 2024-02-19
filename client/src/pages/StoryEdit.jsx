import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAuth } from "../slices/authSlice";
import {
  useUpdateStoryMutation,
  useGetStoryQuery,
} from "../slices/storiesApiSlice";
import Loading from "../components/common/Loading";
import { toast } from "react-toastify";
import { useUploadStoryCoverMutation } from "../slices/storiesApiSlice";
export default function StoryEdit() {
  const { id: storyId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadStoryCover, { isLoading: loadingUpload }] =
    useUploadStoryCoverMutation();
  const {
    data: story,
    isLoading: isUpadating,
    error,
  } = useGetStoryQuery(storyId);
  const [updateStory, { isLoading }] = useUpdateStoryMutation();
  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setContent(story.content);
      setCover(story.cover);
    }
  }, [story]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (content.length < 300) {
      toast.error("Story length must be under 300 character");
    } else {
      try {
        const res = await updateStory({
          storyId,
          title,
          content,
          cover,
        }).unwrap();
        dispatch(updateStory({ ...res }));
        toast.success("Story updated");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const uploadStoryCoverHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadStoryCover(formData).unwrap();
      toast.success(res.message);
      setCover(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <section className="mx-auto bg-neutral-800 rounded-lg p-2 m-1">
      <h1 className="text-orange-600 text-3xl mb-4 ">Edit Story</h1>

      <div className="bg-neutral-800  rounded-lg">
        <form onSubmit={submitHandler}>
            <label htmlFor="title" className="flex flex-col gap-2 mb-4">
              Title
              <input
                className="w-full p-2 bg-orange-50 text-neutral-400 rounded-md focus:outline-none "
                type="text"
                placeholder="Title of The story"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="title"
              />
            </label>
            <label
              htmlFor="content"
              className="w-full flex flex-col  gap-2  mb-4"
            >
              Content
              <textarea
                className="p-2 bg-orange-50 text-neutral-400 rounded-md focus:outline-none "
                type="text"
                placeholder="Tell The Story"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                id="content"
                rows={"4"}
              />
            </label>
            <input
              type="file"
              onChange={uploadStoryCoverHandler}
              id="file"
              className="sr-only"
            />
            <label
              htmlFor="file"
              className="relative flex items-center justify-center rounded-md text-center"
            >
              <div>
                <span className="mb-2 block text-sm md:text-md font-medium ">
                  Change story cover image
                </span>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={cover}
                    onChange={(e) => setCover}
                    className="py-2 bg-orange-50 text-neutral-400 rounded-s-md border border-orange-50 focus:outline-none"
                  />
                  <span className="inline-flex rounded-e border border-orange-50 py-2 px-6 text-md font-medium cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </label>
          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded-md"
            >
              {isLoading ? <Loading /> : <span>Save Changes</span>}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

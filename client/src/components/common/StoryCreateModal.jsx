import React, { useRef, useState } from "react";
import {
  useCreateStoryMutation,
  useUploadStoryCoverMutation,
} from "../../slices/storiesApiSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function StoryCreateModal({ onClose }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [characterLimit, setCharacterLimit] = useState("");
  const [createStory, { isLoading }] = useCreateStoryMutation();
  const [uploadStoryCover, { isLoading: loadingUpload }] =
    useUploadStoryCoverMutation();
    const handleCharacterLimit = (e) => {
      const count = 300 - (e.target.value.length) 
      setCharacterLimit(count)
    }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (content.length > 300) {
      toast.error("Story must not surpass 300 character");
    } else {
      try {
        const res = await createStory({
          title,
          content,
          cover,
        }).unwrap();
        onClose();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        onClose();
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
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-1 md:p-0"
    >
      <div className="w-full md:w-1/2 bg-neutral-800 border border-neutral-700 rounded-lg">
        <div className="flex justify-between items-center border-b-2 border-neutral-600 p-2 mb-4">
          <h1 className="text-xl">Write a Story</h1>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <span className="material-symbols-rounded">cancel</span>
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <div className="p-2">
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
              Content: &#40;300 character only&#41;
              <textarea
                className="p-2 bg-orange-50 text-neutral-400 rounded-md focus:outline-none "
                type="text"
                placeholder="Tell The Story"
                value={content}
                onInput={handleCharacterLimit}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                id="content"
              />
              {characterLimit && (<span className=" text-orange-600">{characterLimit} character left</span>) }
            </label>
            <input
              type="file"
              onChange={uploadStoryCoverHandler}
              id="file"
              className="sr-only"
            />
            <label
              htmlFor="file"
              className="relative flex items-center justify-center rounded-md border border-dashed border-white p-2 text-center"
            >
              <div>
                <span className="mb-2 block text-md font-medium ">
                  Choose an image as a cover for the story
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
          </div>
          <div className="flex justify-end items-center gap-2 border-t-2 border-neutral-700 mt-4 p-2">
            <button
              onClick={onClose}
              type="reset"
              className="px-4 py-2 bg-transprent hover:bg-neutral-600 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded-md"
            >
              {isLoading ? <Loading /> : <span>Post</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

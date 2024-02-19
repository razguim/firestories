import  { useRef } from "react";
import {
  useDeleteStoryMutation,
} from "../../slices/storiesApiSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function StoryDeleteModal({ onClose,storyId,storyTitle }) {
  const modalRef = useRef();
  const navigate = useNavigate()
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
        onClose();
    }
  };
  const [deleteStory,{isLoading}] = useDeleteStoryMutation(storyId)
  const handleStoryDelete = async () => {
    try {
        await deleteStory(storyId);
        onClose();
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
     
  };
  
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-1 md:p-0"
    >
      <div className=" flex flex-col justify-center items-center p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
        <p>are you sure you want to delete {storyTitle} ?</p>
        <div className="flex justify-between items-center gap-2 mt-5">
            <button onClick={onClose} className="px-6 py-2 rounded-md bg-transparent hover:bg-neutral-400">Cancle</button>
            <button onClick={handleStoryDelete} className="px-6 py-2 rounded-md bg-red-600">
                {isLoading ? (<Loading/>) :('Yes')}
            </button>
        </div>
      </div>
    </div>
  );
}

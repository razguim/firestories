import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useBanUserMutation } from "../../slices/usersApiSlice";
import moment from "moment/moment";
export default function BanModal({ onClose, userId }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const [banUser] = useBanUserMutation();
  const [banDuration, setBanDuration] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await banUser({ banDuration, userId }).unwrap();
      onClose();
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
      <form
        onSubmit={submitHandler}
        className=" flex flex-col justify-start items-center gap-2 p-6 bg-neutral-800 border border-neutral-700 rounded-lg"
      >
        <label
          htmlFor="duration"
          className="flex flex-col justify-start items-center gap-2"
        >
          Ban User
          <select
            onChange={(e) => setBanDuration(e.target.value)}
            value={banDuration}
            id="duration"
            className="w-full h-10 bg-orange-600 border-1 border-orange-600 focus:outline-none focus:border-orange-600  rounded px-2 md:px-3 py-0 md:py-1"
          >
            <option>Select Duration</option>
            <option value="7">for one weeks</option>
            <option value="14">for two weeks</option>
            <option value="21">for three weeks</option>
            <option value="30">for a month</option>
          </select>
        </label>
        <button
          type="submit"
          className="py-2 px-4 bg-orange-400 hover:bg-orange-600 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
}

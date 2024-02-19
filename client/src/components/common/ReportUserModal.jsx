import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useReportUserMutation } from "../../slices/reportsApiSlice";

export default function ReportUserModal({ onClose,username,fullname }) {
  const [reason, setReason] = useState("");
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
        onClose();
    }
  };
  const [reportUser, { isLoading }] = useReportUserMutation();
  const handleUserReport = async (e) => {
    e.preventDefault()
    try {
      await reportUser({ reason, username });
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
      <div className=" flex flex-col items-center gap-2 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
        <h1 className="text-xl ">Report User : {fullname}</h1>
        <form onSubmit={handleUserReport} className="flex flex-col gap-2">
          <label htmlFor="reason" >
            <textarea
              className="w-full p-2 bg-orange-50 text-neutral-400 rounded-md focus:outline-none "
              type="text"
              placeholder="Reason For report this story : "
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              id="reason"
            />
          </label>
          <input type="hidden" value={username} />
          <button type="submit" className="p-4 rounded bg-orange-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import ReportUserModal from "./ReportUserModal";

export default function ReportUserButton({username,fullname}) {
  const [showReportUserModal, setShowReportUserModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowReportUserModal(true)}
        className="flex justify-center md:justify-between items-center md:gap-2 py-2 md:py-1 px-2 md:px-4 bg-transparent rounded hover:bg-orange-600"
      >
        <span className="material-symbols-rounded">warning</span>
        <span className="hidden lg:inline-block">Report User</span>
      </button>
      {showReportUserModal && (
        <ReportUserModal
          username={username}
          fullname={fullname}
          onClose={() => setShowReportUserModal(false)}
        />
      )}
    </>
  );
}

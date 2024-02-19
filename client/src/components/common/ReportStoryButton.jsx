import React, { useState } from "react";
import ReportStoryModal from "./ReportStoryModal";

export default function ReportStoryButton({ storyId, storyTitle }) {
  const [showReportStoryModal, setShowReportStoryModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowReportStoryModal(true)}
        className="px-5 py-1 bg-transparent rounded hover:bg-orange-600"
      >
        Report Story
      </button>
      {showReportStoryModal && (
        <ReportStoryModal
          storyId={storyId}
          storyTitle={storyTitle}
          onClose={() => setShowReportStoryModal(false)}
        />
      )}
    </>
  );
}

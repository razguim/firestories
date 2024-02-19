import { useState } from "react";
import BanModal from "./BanModal";
export default function BanButton(userId) {
  const [showBanModal, setShowBanModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowBanModal(true)}
        className="py-2 px-4 bg-orange-400 hover:bg-orange-600 rounded-lg flex items-center gap-2"
      >
        <span className="material-symbols-rounded">block</span>Ban
      </button>
      {showBanModal && (
        <BanModal userId={userId} onClose={() => setShowBanModal(false)} />
      )}
    </>
  );
}

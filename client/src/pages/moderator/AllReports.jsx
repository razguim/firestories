import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetReportsQuery } from "../../slices/reportsApiSlice";
import SkeltonLoader from "../../components/common/SkeltonLoader";
import MessageAlert from "../../components/common/MessageAlert";
import ReportCard from "../../components/common/ReportCard";
import AddNewModModal from "../../components/common/AddNewModal";


export default function AllReports() {
  const [addModModal,setAddModModal] = useState(false)
  const { data:reports, isLoading, error } = useGetReportsQuery();
  return (
    <>
      <section className="mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-2 ">
        <button
          onClick={() => setAddModModal(true)}
          className="p-2 rounded-full flex items-center gap-2 bg-orange-600"
        >
          add a moderator
        </button>
        {addModModal && <AddNewModModal onClose={() => setAddModModal(false)} />}
      </section>
      {isLoading ? (
        <SkeltonLoader />
      ) : error ? (
        <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
      ) : (
            reports.map((report) => (
                <ReportCard key={report._id} report={report} />
            ))
      )}
    </>
  );
}

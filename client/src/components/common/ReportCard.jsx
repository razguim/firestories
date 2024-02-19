import React from "react";
import { Link } from "react-router-dom";

export default function ReportCard({ report }) {
  return (
    <article className="bg-neutral-800 rounded border border-neutral-600 mb-4">
      <header className="p-2 border-b border-neutral-600 flex justify-start items-center space-x-2 text-orange-600">
       <h2 className="text-xl">Report : </h2>
       <Link className="hover:underline hover:text-orange-400" to={`/${ Object.keys(report.typeId)}/${Object.values(report.typeId)}`}>
          {Object.values(report.typeId)}
        </Link>
      </header>
      <div className="p-2">
      <h3 className="text-lg">Reason for reporting: </h3>
      <p >{report.reason}</p>
      </div>
    </article>
  );
}

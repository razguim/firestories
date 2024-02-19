import React from "react";

export default function SkeltonLoader() {
  return (
    <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-col-4">
      {[...new Array(12)].map((_, id) => (
        <div key={id} className="w-64 h-24 rounded-lg mt-4">
          <div className="flex animate-pulse flex-row items-center h-full justify-center gap-2">
            <div className="w-24 bg-neutral-300 h-24 rounded-l-lg"></div>
            <div className="flex justify-center items-center h-24 bg-neutral-800">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-40"
              >
                <path
                  fillRule="evenodd"
                  d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

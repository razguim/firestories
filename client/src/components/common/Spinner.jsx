import React from "react";

export default function Spinner(fullpage) {
  return (
    <>
      {fullpage ? (
        <div className="h-screen flex justify-center items-center">
          <div className="border-neutral-800 size-20 animate-spin rounded-full border-8 border-t-orange-600" />
        </div>
      ) : (
        <div class="inline-block size-5 rounded-full animate-spin border border-solid border-white border-t-transparent"></div>
      )}
    </>
  );
}

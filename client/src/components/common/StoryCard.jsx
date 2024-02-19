import React from "react";
export default function StoryCard({ story }) {
  return (
      <article className="flex gap-2 items-center bg-neutral-800 rounded-r-lg">
        <img
          className="w-24 h-24 rounded-l-lg object-cover"
          src={story.cover}
          alt={story.title}
        />
        <div className="flex flex-col">
          <h2 className="text-xl">{story.title}</h2>
          <p className="text-base">
            by {story.postedBy?.username}
             </p>
        </div>
      </article>
  );
}

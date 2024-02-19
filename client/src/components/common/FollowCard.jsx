import React from "react";
import { Link } from "react-router-dom";
export default function FollowCard({ follow }) {
  return (
    <Link to={`/${follow.username}`}>
      <article className="flex gap-2 items-center bg-neutral-800 rounded-r-lg">
        <img
          className="w-24 h-24 rounded-l-lg object-cover"
          src={follow.avatar}
          alt={`${follow.firstname} ${follow.lastname}`}
        />
        <div className="flex flex-col">
          <h2 className="text-xl">{`${follow.firstname} ${follow.lastname}`}</h2>
          <p className="text-base">
          {follow.username}
          </p>
        </div>
      </article>
    </Link>
  );
}

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
export default function Paginate({ pages,searchQuery,routePath }) {

  return (
    pages > 1 && (
        <nav className="w-1/2 mx-auto flex items-center p-2 rouded-lg  space-x-2 rounded">
          {[...Array(pages).keys()].map((p) => (
            <NavLink
              key={p + 1}
              to={routePath && searchQuery  ?  `${routePath}/search/${searchQuery}/page/${p + 1}` : `${routePath}/page/${p + 1}`}
              className={({ isActive }) =>
                `bg-neutral-600 p-2 rounded hover:bg-orange-600 ${
                  isActive ? "bg-orange-600" : null
                }`
              }
            >
              {p + 1}
            </NavLink>
          ))}
        </nav>
    )
  );
}

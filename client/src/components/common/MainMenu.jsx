import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
export default function MainMenu() {
  const getClass = ({ isActive }) =>
  `flex justify-between items-center gap-2 hover:text-orange-600 ${
    isActive ? "text-orange-600" : null
  }`
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="bg-neutral-800 p-4 rounded-t-lg md:rounded-lg fixed md:static bottom-0 left-0 right-0">
      <nav className=" flex flex-row justify-between items-center md:flex-col md:items-start md:text-xl gap-2 md:gap-6">
        {userData.isMod ? (<>
          <Link
          to="/mod"
          className="flex justify-between items-center text-orange-600 text-center"
        >
          <span className="material-symbols-rounded text-4xl">
            local_fire_department
          </span>
          <span className="hidden md:inline-block text-3xl mt-2">
            Firestories
          </span>
        </Link>
          <NavLink to='/mod/users'
          className={getClass}
        >
          <span className="material-symbols-rounded">group</span>
          <span className="hidden md:inline-block">Users</span>
        </NavLink>
        <NavLink
          to="/mod/stories"
          className={getClass}
        >
          <span className="material-symbols-rounded">post</span>
          <span className="hidden md:inline-block">Stories</span>
        </NavLink></>
        ):(<>
        <Link
          to="/"
          className="flex justify-between items-center text-orange-600 text-center"
        >
          <span className="material-symbols-rounded text-4xl">
            local_fire_department
          </span>
          <span className="hidden md:inline-block text-3xl mt-2">
            Firestories
          </span>
        </Link>
          <NavLink to='/following'
         
          className={getClass}
        >
          <span className="material-symbols-rounded">rss_feed</span>
          <span className="hidden md:inline-block">Following</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className={getClass}
        >
          <span className="material-symbols-rounded">favorite</span>
          <span className="hidden md:inline-block">Favorites</span>
        </NavLink>
        <NavLink
          to={`/user/${userData?.username}`}
          className={getClass}
        >
          <span className="material-symbols-rounded">account_circle</span>
          <span className="hidden md:inline-block">{`${userData?.firstname} ${userData?.lastname}`}</span>
        </NavLink>
        </>
        )}
        
        <Link
          to="/logout"
          onClick={logoutHandler}
          className="flex justify-between items-center gap-2 hover:text-orange-600"
        >
          <span className="material-symbols-rounded">logout</span>
          <span className="hidden md:inline-block">Logout</span>
        </Link>
      </nav>
    </section>
  );
}

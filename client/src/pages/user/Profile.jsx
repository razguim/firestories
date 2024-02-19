import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import { useGetUserByUserNameQuery } from "../../slices/usersApiSlice";
import Spinner from "../../components/common/Spinner";
import MessageAlert from "../../components/common/MessageAlert";
import { useSelector } from "react-redux";
import FollowButton from "../../components/common/FollowButton";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useState } from "react";
import BanButton from "../../components/common/BanButton";
import ReportUserButton from "../../components/common/ReportUserButton";
export default function Profile() {
  const getClass = ({ isActive }) =>
    `p-2 rounded flex justify-center md:justify-between items-center md:gap-2 ${
      isActive ? "bg-orange-600" : "bg-transparent hover:bg-orange-600"
    }`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { userData } = useSelector((state) => state.auth);
  const { username } = useParams();
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useGetUserByUserNameQuery(username);
  return (
    <>
      <section className=" mx-auto">
        {isLoading ? (
          <Spinner fullpage/>
        ) : error ? (
          <MessageAlert>{error?.data?.message || error.error}</MessageAlert>
        ) : (
          <>
            <section className=" bg-neutral-800 p-2 flex flex-col justify-center items-center gap-2 mb-4">
              <img
                src={fetchedUser?.avatar ?? defaultAvatar}
                alt={`${fetchedUser?.firstname} ${fetchedUser?.lastname}`}
                className="size-32 rounded-full mb-2"
              />

              <div className="flex justify-between items-center gap-2">
                <h2 className="text-xl">{`${fetchedUser?.firstname} ${fetchedUser?.lastname}`}</h2>
                {userData._id === fetchedUser._id ? (
                  <Link
                    to="/settings"
                    className="py-1 px-5 bg-orange-400 hover:bg-orange-600 rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-rounded">edit</span>
                    <span className="hidden md:inline-block">Edit Profile</span>
                  </Link>
                ) : userData.isMod ? (
                  <BanButton
                    userId={fetchedUser._id}
                  />
                ) : (
                  <FollowButton
                    followed={fetchedUser.followers.includes(userData._id)}
                    username={fetchedUser.username}
                  />
                )}
              </div>
              <p>{fetchedUser?.username}</p>
            </section>

            <nav className="flex justify-between items-center gap-2 md:gap-4 mt-4 text-sm md:text-base mb-6">
              <div className="flex justify-start items-center gap-2 ">
                <NavLink
                  end
                  to={`/user/${fetchedUser.username}`}
                  className={getClass}
                >
                  <span className="material-symbols-rounded">post</span>
                  <span className="hidden md:inline-block">Stories</span>
                </NavLink>
                <NavLink
                  end
                  to={`/user/${fetchedUser.username}/favorites`}
                  className={getClass}
                >
                  <span className="material-symbols-rounded">favorite</span>
                  <span className="hidden md:inline-block">Favorites</span>
                </NavLink>
                <NavLink
                  end
                  to={`/user/${fetchedUser.username}/following`}
                  className={getClass}
                >
                  <span className="material-symbols-rounded">rss_feed</span>
                  <span className="hidden md:inline-block">Following</span>
                </NavLink>
                <NavLink
                  end
                  to={`/user/${fetchedUser.username}/followers`}
                  className={getClass}
                >
                  <span className="material-symbols-rounded">group</span>
                  <span className="hidden md:inline-block">Followers</span>
                </NavLink>
              </div>
              <div className="flex justify-start items-center gap-2 ">
                {userData._id === fetchedUser._id ? (
                  <>
                    <Link
                      to={`/delete/${fetchedUser._id}`}
                      className="flex justify-center md:justify-between items-center md:gap-2 py-2 md:py-1 px-2 md:px-4 bg-transparent hover:bg-orange-500 rounded"
                    >
                      <span className="material-symbols-rounded">delete_forever</span>
                      <span className="hidden md:inline-block">
                        Delete Profile
                      </span>
                    </Link>
                  </>
                ) : !userData?.isMod ? (
                  <ReportUserButton
                  username={fetchedUser.username}
                    fullname={`${fetchedUser.firstname} ${fetchedUser.lastname}`}
                  />
                ):null}
              </div>
            </nav>
          </>
        )}
      </section>
      <section>
        <Outlet />
      </section>
    </>
  );
}

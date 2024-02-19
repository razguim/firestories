import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Settings from "./pages/user/Settings";
import Login from "./pages/Login";
import StoryPage from "./pages/StoryPage";
import StoryEdit from "./pages/StoryEdit";
import Profile from "./pages/user/Profile";
import UserStories from "./pages/user/UserStories";
import Following from "./pages/user/UserFollowing";
import Followers from "./pages/user/UserFollowers";
import Favorites from "./pages/user/UserFavorites";
import FollowingFeed from "./pages/FollowingFeed";
import FavoritesFeed from "./pages/FavoritesFeed";
import DeleteProfile from "./pages/user/DeleteProfile";
import NotFound from "./pages/NotFound";
import AllReports from "./pages/moderator/AllReports";
import ModUsers from "./pages/moderator/ModUsers";
import ModStories from "./pages/moderator/ModStories";
import CreateMod from "./pages/moderator/CreateMod";

function RestrictedRoutes() {
  const { userData } = useSelector((state) => state.auth);
  return userData ? <Outlet /> : <Navigate to="/login" replace />;
}
function ModRoutes() {
  const { userData } = useSelector((state) => state.auth);
  return userData && userData.isMod ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />} />
            <Route path="/search/:searchQuery/" element={<Home />} />
            <Route path="/page/:pageNumber" element={<Home />} />
            <Route
              path="/search/:searchQuery/page/:pageNumber"
              element={<Home />}
            />
            <Route path="/favorites" element={<FavoritesFeed />} />
            <Route
              path="/favorites/page/:pageNumber"
              element={<FavoritesFeed />}
            />
            <Route path="/following" element={<FollowingFeed />} />
            <Route
              path="/following/page/:pageNumber"
              element={<FollowingFeed />}
            />

            <Route path="story/:id" element={<StoryPage />} />
            <Route path="story/edit/:id" element={<StoryEdit />} />
            <Route path="settings" element={<Settings />} />
            <Route path="delete/:id" element={<DeleteProfile />} />
            <Route path="user/:username" element={<Profile />}>
              <Route index element={<UserStories />} />
              <Route path="following" element={<Following />} />
              <Route path="followers" element={<Followers />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="mod" element={<ModRoutes />}>
              <Route index={true} element={<AllReports />} />
              <Route path="users" element={<ModUsers />} />
              <Route path="stories" element={<ModStories />} />
              <Route path="newmod" element={<CreateMod />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

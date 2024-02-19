import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setAuth } from "../../slices/authSlice";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUploadUserAvatarMutation,
} from "../../slices/usersApiSlice";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";
export default function Settings() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userData } = useSelector((state) => state.auth);
  const [uploadUserAvatar] = useUploadUserAvatarMutation();
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  useEffect(() => {
    setFirstName(userData.firstname);
    setLastName(userData.lastname);
    setEmail(userData.email);
    setUsername(userData.username);
    setAvatar(userData.avatar);
  }, [
    userData.firstname,
    userData.lastname,
    userData.email,
    userData.username,
    userData.avatar,
  ]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userData._id,
          firstname,
          lastname,
          username,
          avatar,
          email,
          password,
        }).unwrap();
        dispatch(setAuth({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const uploadStoryAvatarHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadUserAvatar(formData).unwrap();
      toast.success(res.message);
      setAvatar(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleUserDelete = async () => {
    try {
        await deleteUser(userData._id);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
     
  };
  return (
    <>
      <section className="mx-auto bg-neutral-800 rounded-lg p-2 md:p-4 mb-2">
        <h1 className="text-orange-600 text-3xl mb-4 ">Update User info</h1>
        <form onSubmit={submitHandler} className="my-3">
          <label htmlFor="firstname" className="flex flex-col gap-2 mb-6">
            First Name:
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="lastname" className="flex flex-col gap-2 mb-6">
            Last Name:
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-2 mb-6">
            Email Adress:
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="username" className="flex flex-col gap-2 mb-6">
            Userame:
            <input
              type="text"
              id="username"
              placeholder="Enter your email address"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <input
            type="file"
            onChange={uploadStoryAvatarHandler}
            id="file"
            className="sr-only"
          />
          <label
            htmlFor="file"
            className="relative flex items-center justify-center rounded-md border border-dashed border-white p-2 text-center mb-6"
          >
            <div>
              <span className="mb-2 block text-sm md:text-md font-medium ">
                Change profile avatar
              </span>
              <div className="flex items-center">
                <input
                  type="text"
                  value={avatar || ""}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="py-2 bg-orange-50 text-neutral-400 rounded-s-md border border-orange-50 focus:outline-none"
                />
                <span className="inline-flex rounded-e border border-orange-50 py-2 px-6 text-md font-medium cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </label>
          <label htmlFor="password" className="flex flex-col gap-2 mb-6">
            Password:
            <input
              type="password"
              id="password"
              placeholder="Type Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="cpassword" className="flex flex-col gap-2 mb-6">
            Confirm Password:
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <div className="flex justify-end items-center gap-2">
            <button className="py-2 px-4 bg-orange-400 text-white rounded-xl">
              {loadingUpdate ? <Loading /> : <span>Save</span>}
            </button>
          </div>
        </form>
      </section>
      
    </>
  );
}

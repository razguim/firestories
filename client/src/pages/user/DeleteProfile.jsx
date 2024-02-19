import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDeleteUserMutation, useLogoutMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function DeleteProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id:userId} = useParams()
  
  const [logoutCall] = useLogoutMutation();
  const [deleteUser, { isLoading }] = useDeleteUserMutation(userId);
  const handleUserDelete = async () => {
    try {
      await deleteUser(userId);
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <section className="bg-neutral-800 rounded-lg p-2 md:p-4 mb-2">
      <h2 className="text-orange-600 text-3xl mb-4 ">Delete Profile</h2>
      <p className="text-lg mb-2">
        Are you sure you want to delete your profile?
      </p>
      <button
        onClick={handleUserDelete}
        className="px-5 py-1 rounded bg-red-600"
      >
        Yes, delete my profile
      </button>
    </section>
  );
}

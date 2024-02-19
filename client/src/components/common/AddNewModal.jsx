import React, { useEffect, useRef, useState } from "react";
import {
  useCreateModMutation
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function AddNewModModal({ onClose }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createMod, { isLoading }] = useCreateModMutation();
  const { userData } = useSelector((state) => state.auth);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await createMod({
          firstname,
          lastname,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setAuth({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-1 md:p-0"
    >
      <div className=" bg-neutral-800 border border-neutral-700 rounded-lg">
        <div className="flex justify-between items-center border-b-2 border-neutral-600 p-2 mb-4">
          <h1 className="text-xl">Add New Moderator</h1>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <span className="material-symbols-rounded">cancel</span>
          </button>
        </div>
        <form onSubmit={submitHandler} className="mt-3 flex flex-col p-2">
          <div className="flex justify-between items-center gap-2">
          <label htmlFor="fname" className="flex flex-col gap-2 mb-6">
            First Name:
            <input
              type="text"
              id='fname'
              placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="lname" className="flex flex-col gap-2 mb-6">
            Last Name:
            <input
              type="text"
              id='lname'
              placeholder="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          </div>
          <div className="flex justify-between items-center gap-2">
          <label htmlFor="email" className="flex flex-col gap-2 mb-6">
            Email Adress:
            <input
              type="email"
              id='email'
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          <label htmlFor="username" className="flex flex-col gap-2 mb-6">
            Usename:
            <input
              type="text"
              id='username'
              placeholder="Choose your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          </div>
          <div className="flex justify-between items-center gap-2">
          <label htmlFor="password" className="flex flex-col gap-2 mb-6">
            Password:
            <input
              type="password"
              id='password'
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
              type='password'
              id='cpassword'
              placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              className="p-2 bg-orange-50 hover:bg-orange-100 outline-none text-neutral-600 rounded-xl"
            />
          </label>
          </div>
          
          <div className="mt-4">
            
            <button className="py-2 px-4 bg-orange-400 text-white rounded-xl">
            {
          isLoading ? (<Loading/>)  : (<span>Add Mod</span>)
        }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

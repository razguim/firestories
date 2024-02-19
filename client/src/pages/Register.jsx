import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";
export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [navigate, userData]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
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
    <main className="container mx-auto mt-10 flex justify-center items-center">
    <div className="max-w-4xl  bg-neutral-800 rounded-lg p-4 m-1">
      
        <h1 className="text-orange-600 text-3xl text-center">Register</h1>
        <form onSubmit={submitHandler} className="mt-3">
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
          
          <div className="flex justify-end items-center gap-2">
            <p className="text-sm md:text-base">
              Already have an account login 
              <Link to='/login' className="text-orange-600 hover:underline"> Here</Link>
            </p>
            <button className="py-2 px-4 bg-orange-400 text-white rounded-xl">
            {
          isLoading ? (<Loading/>)  : (<span>Register</span>)
        }
            </button>
          </div>
        </form>
      </div>
  </main>
  )
}

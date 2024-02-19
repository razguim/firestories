import logImg from "../assets/logimg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setAuth } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [navigate, userData]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setAuth({ ...res }));
      console.log(res);
      if(res.isMod){
        navigate("/mod");
      }
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <main className="container mx-auto mt-10 flex justify-center items-center">
      <div className="max-w-4xl flex justify-between items-center gap-2 bg-neutral-800 rounded-lg p-2 m-1">
        <section className="hidden md:flex justify-center items-center md:w-1/2 ">
          <div className="text-center ">
            <h1 className="text-orange-600 text-3xl mb-4">Firestory</h1>
            <img
              src={logImg}
              alt="Firestory"
              className="size-52 rounded-full mx-auto mb-4"
            />
            <p className="text-base">
              Write and discover stories worthy of sharing in campfire gatherings
            </p>
          </div>
        </section>
        <section className="w-full md:w-1/2">
          <h2 className="text-orange-600 text-3xl">Login</h2>
          <form onSubmit={submitHandler} className="mt-3">
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
            <div className="flex justify-end items-center gap-2">
              <p className="text-sm md:text-base">
                Don't have an account register
                <Link
                  to="/register"
                  className="text-orange-600 hover:underline"
                >
                  Here
                </Link>
              </p>
              <button className="py-2 px-4 bg-orange-400 text-white rounded-xl">
                {isLoading ? <Loading /> : <span>Login</span>}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

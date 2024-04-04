import Navbar from "../Core/Navbar";
import Background from "../Background";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../features/authentications/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import React from "react";
import { showAlert } from "../Core/utils.js";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwdVisibility, setPwdVisibility] = useState(false);

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const dispatch = useDispatch();

  const handleInput = (event, type) => {
    switch (type) {
      case "username":
        setUsername(event.target.value);
        break;
      case "pwd":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      await dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
      // setLoading(false);
      navigate("/", {
        state: { successMessage: "Welocom to your 3d labratory." },
      });
    } catch (error) {
      console.log(error.response);
      // setLoading(false);
      if (!error?.originalStatus) {
        showAlert("error", error.response?.data?.detail);
      } else if (error.originalStatus === 400) {
        showAlert("error", error.response?.data?.detail);
      } else if (error.originalStatus === 401) {
        showAlert("error", error.response?.data?.detail);
      } else {
        showAlert("error", "Login Failed");
      }
      navigate("/login");
    }
  };

  useEffect(() => {
    if (state && state.successMessage) {
      showAlert("success", state.successMessage);
      // Clear the successMessage from the location state
      navigate(pathname, { replace: true });
    }
  }, [state, navigate, pathname]);

  return (
    <>
      <Navbar />
      <div className="relative text-white flex flex-col items-center">
        <ToastContainer />
        <Suspense>
          <Background />
        </Suspense>
        <div className="absolute top-[10rem] w-full max-w-lg sm:mt-10">
          <div className="backdrop-blur-sm bg-white/5 py-5 px-9 mx-3 border border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div class="absolute inset-0 -z-10 bg-black blur-xl"></div>
            <div className="flex flex-col justify-center mb-5 ">
              <h1 className="p-6 text-center font-semibold text-5xl">Login</h1>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  onChange={(e) => handleInput(e, "username")}
                  type="text"
                  name="username"
                  placeholder="Enter your username..."
                  autoComplete="off"
                  className="bg-neutral-950 w-full rounded-md border border-white/20 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                />
                <div className="relative">
                  <input
                    onChange={(e) => handleInput(e, "pwd")}
                    type={pwdVisibility ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password..."
                    autoComplete="off"
                    className="bg-neutral-950 w-full rounded-md border border-white/20 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {pwdVisibility ? (
                    <FaRegEye
                      onClick={() => setPwdVisibility(false)}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setPwdVisibility(true)}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-y-6 items-center justify-between">
                  <button
                    disabled={!username || !password}
                    className="w-full bg-leva-3 hover:bg-leva-3/80 disabled:bg-leva-3/40 disabled:text-gray-500 transition-colors duration-300 rounded py-3 text-lg text-white"
                  >
                    login
                  </button>
                  <Link
                    className="text-sm font-medium text-foreground underline"
                    to="/register"
                  >
                    You don't have an account? Register here.
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

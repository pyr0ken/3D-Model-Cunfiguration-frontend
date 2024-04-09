import Navbar from "../Core/Navbar";
import Background from "../Background";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React from "react";
import { showAlert } from "../Core/utils.js";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../../store/authStore.js";
import useLogin from "../../hooks/auth/useLogin.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwdVisibility, setPwdVisibility] = useState(false);

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { mutate } = useLogin();
  const { login } = useAuthStore();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setUsername("");
          setPassword("");
          navigate("/", {
            state: { successMessage: "Welocom to your 3d labratory." },
          });
          // Save data in coockie and zustand
          login(data.user, data.accessToken, data.rfreshToken);
        },
        onError: (error) => {
          if (!error?.originalStatus) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 400) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 401) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "Login Failed");
          }
        },
      },
    );
  };

  useEffect(() => {
    if (state && state.successMessage) {
      showAlert("info", state.successMessage);
      // Clear the successMessage from the location state
      navigate(pathname, { replace: true });
    }
  }, [state, navigate, pathname]);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center text-white">
        <ToastContainer />
        <Suspense>
          <Background />
        </Suspense>
        <div className="absolute top-[10rem] w-full max-w-lg sm:mt-10">
          <div className="mx-3 rounded-lg border border-white/20 border-b-white/20 border-l-white/20 border-r-white/20 bg-white/5 px-9 py-5 shadow-[20px_0_20px_20px] shadow-slate-500/10 backdrop-blur-sm sm:border-t-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="absolute inset-0 -z-10 bg-black blur-xl"></div>
            <div className="mb-5 flex flex-col justify-center ">
              <h1 className="p-6 text-center text-5xl font-semibold">Login</h1>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  onChange={(e) => handleInput(e, "username")}
                  type="text"
                  name="username"
                  placeholder="Enter your username..."
                  autoComplete="off"
                  className="w-full rounded-md border border-white/20 bg-neutral-950 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                />
                <div className="relative">
                  <input
                    onChange={(e) => handleInput(e, "pwd")}
                    type={pwdVisibility ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password..."
                    autoComplete="off"
                    className="w-full rounded-md border border-white/20 bg-neutral-950 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {pwdVisibility ? (
                    <FaRegEye
                      onClick={() => setPwdVisibility(false)}
                      className="absolute right-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setPwdVisibility(true)}
                      className="absolute right-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  )}
                </div>
                <div className="mt-3 flex flex-col items-center justify-between gap-y-6">
                  <button className="w-full rounded bg-leva-3 py-3 text-lg text-white transition-colors duration-300 hover:bg-leva-3/80 ">
                    login
                  </button>
                  <Link
                    className="text-sm font-medium text-white underline"
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

import { Suspense, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background";
import Navbar from "../Core/Navbar";
import { apiBase } from "../../services/index.js";
import { showAlert } from "../Core/utils.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [confirmPwdVisibility, setConfirmPwdVisibility] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case "pwd":
        setPwdVisibility((prevState) => !prevState);
        break;
      case "confirmPwd":
        setConfirmPwdVisibility((prevState) => !prevState);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    await apiBase
      .post("/users/register/", {
        username: username,
        password: password,
      })
      .then((response) => {
        navigate("/login", {
          state: { successMessage: "Registration successful. Please log in." },
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.detail;
        console.log(error);
        showAlert(
          "error",
          errorMessage || "An error occurred while registering",
        );
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-dot flex flex-col items-center text-white">
        <ToastContainer position="bottom-left" />
        <Suspense>
          <Background />
        </Suspense>
        <div className="absolute top-[10rem] w-full max-w-lg sm:mt-10">
          <div className="mx-3 rounded-lg border border-white/20 border-b-white/20 border-l-white/20 border-r-white/20 bg-white/5 px-9 py-5 shadow-[20px_0_20px_20px] shadow-slate-500/10 backdrop-blur-sm sm:border-t-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="absolute inset-0 -z-10 bg-black blur-xl"></div>
            <div className="mb-5 flex flex-col justify-center ">
              <h1 className="p-6 text-center text-5xl font-semibold">
                ثبت نام
              </h1>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  required
                  onChange={(e) => handleInput(e, "username")}
                  type="text"
                  name="username"
                  placeholder="لطفا نام کاربری خود را وارد کنید..."
                  autoComplete="off"
                  className="w-full rounded-md border border-white/20 bg-neutral-950 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                />
                <div className="relative">
                  <input
                    required
                    onChange={(e) => handleInput(e, "pwd")}
                    type={pwdVisibility ? "text" : "password"}
                    name="password"
                    placeholder="لطفا پسورد خود را وارد کنید..."
                    autoComplete="off"
                    className="w-full rounded-md border border-white/20 bg-neutral-950 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {pwdVisibility ? (
                    <FaRegEye
                      onClick={() => togglePasswordVisibility("pwd")}
                      className="absolute left-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => togglePasswordVisibility("pwd")}
                      className="absolute left-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  )}
                </div>
                <div className="relative">
                  <input
                    required
                    onChange={(e) => handleInput(e, "confirmPwd")}
                    type={confirmPwdVisibility ? "text" : "password"}
                    name="confirm-password"
                    placeholder="لطفا پسورد خود را تکرار کنید..."
                    autoComplete="off"
                    className="w-full rounded-md border border-white/20 bg-neutral-950 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {confirmPwdVisibility ? (
                    <FaRegEye
                      onClick={() => togglePasswordVisibility("confirmPwd")}
                      className="absolute left-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => togglePasswordVisibility("confirmPwd")}
                      className="absolute left-4 top-0 translate-y-5 cursor-pointer text-gray-300"
                    />
                  )}
                </div>
                <div className="mt-3 flex flex-col items-center justify-between gap-y-6">
                  <input
                    // disabled={!username || !password || !confirmPassword}
                    value="ثبت"
                    type="submit"
                    className="w-full cursor-pointer rounded bg-leva-3 py-3 text-lg text-white transition-colors duration-300 hover:bg-leva-3/80"
                  />
                  <p className="text-sm font-medium text-white">
                    آیا حساب کاربری دارید؟‌
                    <Link
                      className="mr-1 underline hover:text-leva-3"
                      to="/login"
                    >
                      وارد صفحه ورود شوید.
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

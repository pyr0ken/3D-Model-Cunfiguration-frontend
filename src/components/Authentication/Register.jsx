import { Suspense, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background";
import Navbar from "../Core/Navbar";
import { apiBase } from "../../services/index.js";
import { showAlert } from "../Core/utils.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [confirmPwdVisibility, setConfirmPwdVisibility] = useState(false);

  const navigate = useNavigate();

  const handleInput = (event, type) => {
    switch (type) {
      case "username":
        setUsername(event.target.value);
        break;
      case "pwd":
        setPassword(event.target.value);
        break;
      case "confirmPwd":
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };

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
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login", {
          state: { successMessage: "Registration successful. Please log in." },
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.detail;
        console.log(error);
        showAlert(
          "error",
          errorMessage || "An error occurred while registering"
        );
      });
  };

  return (
    <>
      <Navbar />
      <div className="text-white flex flex-col items-center">
        <ToastContainer />
        <Suspense>
          <Background />
        </Suspense>
        <div className="absolute top-[10rem] w-full max-w-lg sm:mt-10">
          <div className="backdrop-blur-sm bg-white/5 py-5 px-9 mx-3 border border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="absolute inset-0 -z-10 bg-black blur-xl"></div>
            <div className="flex flex-col justify-center mb-5 ">
              <h1 className="p-6 text-center font-semibold text-5xl">
                Register
              </h1>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                  required
                  onChange={(e) => handleInput(e, "username")}
                  type="text"
                  name="username"
                  placeholder="Enter your username..."
                  autoComplete="off"
                  className="bg-neutral-950 w-full rounded-md border border-white/20 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                />
                <div className="relative">
                  <input
                    required
                    onChange={(e) => handleInput(e, "pwd")}
                    type={pwdVisibility ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password..."
                    autoComplete="off"
                    className="bg-neutral-950 w-full rounded-md border border-white/20 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {pwdVisibility ? (
                    <FaRegEye
                      onClick={() => togglePasswordVisibility("pwd")}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => togglePasswordVisibility("pwd")}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  )}
                </div>
                <div className="relative">
                  <input
                    required
                    onChange={(e) => handleInput(e, "confirmPwd")}
                    type={confirmPwdVisibility ? "text" : "password"}
                    name="confirm-password"
                    placeholder="Confirm your password..."
                    autoComplete="off"
                    className="bg-neutral-950 w-full rounded-md border border-white/20 p-4 text-slate-100 transition-colors duration-500 placeholder:select-none  placeholder:text-neutral-500 focus:border-leva-3 focus:outline-none"
                  />
                  {confirmPwdVisibility ? (
                    <FaRegEye
                      onClick={() => togglePasswordVisibility("confirmPwd")}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => togglePasswordVisibility("confirmPwd")}
                      className="absolute cursor-pointer text-gray-300 right-4 top-0 translate-y-5"
                    />
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-y-6 items-center justify-between">
                  <button
                    disabled={!username || !password || !confirmPassword}
                    className="w-full bg-leva-3 hover:bg-leva-3/80 disabled:bg-leva-3/40 disabled:text-gray-500 transition-colors duration-300 rounded py-3 text-lg text-white"
                  >
                    submit
                  </button>
                  <Link
                    className="text-sm font-medium text-foreground underline"
                    to="/login"
                  >
                    Do you have an account? Login here.
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

import Navbar from "../Core/Navbar";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Background from "../Background";
import { Suspense, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);

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

  const togglePasswordVisibility = () => {
    setCheck((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${apiUrl}/register/`, {
        username: username,
        password: password,
      });

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      navigate("/login", {
        state: { successMessage: "Registration successful. Please log in." },
      });
    } catch (error) {
      setError(error.response.data.username[0]);
    }
  };


  return (
    <>
      <Navbar />
      <div className="bg-black relative text-white flex flex-col items-center">
        <Suspense>
          <Background />
        </Suspense>
        <div className="absolute top-[10rem] w-full max-w-lg sm:mt-10">
          <div className="backdrop-blur-sm bg-white/5 p-4 mx-3 border border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex justify-center">
              <h1 className="p-6 mb-5 font-semibold text-5xl">Register</h1>
            </div>
            <div className="p-6 pt-0">
              <form className="flex flex-col gap-y-5">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Username
                      </label>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username..."
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Confirm Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="confirm-password"
                        placeholder="Enter again your password..."
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <a
                    className="text-sm font-medium text-foreground underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                  <div className="flex gap-x-2">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                      href="/register"
                    >
                      Login
                    </Link>
                    <button
                      className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

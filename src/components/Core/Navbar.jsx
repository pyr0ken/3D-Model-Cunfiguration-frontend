import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/authentications/authSlice";
import LogoutModal from "../Authentication/Logout";

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="absolute z-10 w-full">
      <nav className="px-4 py-4 flex justify-between">
        <Link className="text-3xl font-bold leading-none" to="/">
          <svg
            className="h-10"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xml:space="preserve"
          >
            <g>
              <polygon
                style={{ fill: "#007BFF" }}
                points="29,58 3,45 3,13 29,26 	"
              />
              <polygon
                style={{ fill: "#556080" }}
                points="29,58 55,45 55,13 29,26 	"
              />
              <polygon
                style={{ fill: "#434C6D" }}
                points="3,13 28,0 55,13 29,26 	"
              />
            </g>
          </svg>
        </Link>
        <ul className="flex ml-40 flex-wrap items-center space-x-6 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-leva-3 hover:text-white font-medium transition-all"
                  : "text-gray-400 hover:text-white font-medium transition-all"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="/dashboard"
              className="text-gray-400 hover:text-white font-medium transition-all"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="/model"
              className="text-gray-400 hover:text-white font-medium transition-all"
            >
              Model
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="text-gray-400 hover:text-white font-medium transition-all"
            >
              About Us
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="text-gray-400 hover:text-white font-medium transition-all"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <LogoutModal />
              <Link
                className="py-2 px-6 bg-leva-3 hover:bg-leva-3/60 text-white font-bold rounded-xl transition duration-200"
                to=""
              >
                Profile <span className="underline">@{user.username}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                className="py-2 px-6 bg-gray-50 hover:bg-gray-300 text-gray-900 font-bold  rounded-xl transition duration-200"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="py-2 px-6 bg-leva-3 hover:bg-leva-3/60 text-white font-bold rounded-xl transition duration-200"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

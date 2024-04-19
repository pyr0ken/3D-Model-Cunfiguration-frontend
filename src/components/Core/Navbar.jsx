import { NavLink, Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { showAlert } from "./utils";
import { useAuthStore } from "../../store/authStore";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = () => {
    logout();
    showAlert("info", "User logged out successfully.");
  };

  return (
    <div className="absolute z-10 w-full">
      <nav className="flex justify-between px-4 py-4">
        <div className="flex gap-x-5">
          <Link className="text-3xl font-bold leading-none" to="/">
            <svg
              className="h-10"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 58 58"
              xmlSpace="preserve"
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
          <ThemeToggle />
        </div>
        <ul className="ml-40 flex flex-wrap items-center space-x-6 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-leva-3 transition-all hover:text-white"
                  : "font-medium text-gray-400 transition-all hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="/dashboard"
              className="font-medium text-gray-400 transition-all hover:text-white"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="font-medium text-gray-400 transition-all hover:text-white"
            >
              About Us
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="font-medium text-gray-400 transition-all hover:text-white"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <Button
                onPress={onOpen}
                className="rounded-xl bg-gray-50 px-6 py-2 font-bold text-gray-900  transition duration-200 hover:bg-gray-300"
              >
                Logout
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="text-white dark"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Confirm Logout
                      </ModalHeader>
                      <ModalBody>
                        <p>Are you sure you want to logout?</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="solid"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={handleLogout}>
                          Logout
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
              <Link
                className="rounded-xl bg-leva-3 px-6 py-2 font-bold text-white transition duration-200 hover:bg-leva-3/60"
                to=""
              >
                Profile <span className="underline">@{user.username}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                className="rounded-xl bg-gray-50 px-6 py-2 font-bold text-gray-900  transition duration-200 hover:bg-gray-300"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="rounded-xl bg-leva-3 px-6 py-2 font-bold text-white transition duration-200 hover:bg-leva-3/60"
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

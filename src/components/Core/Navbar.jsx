import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ThemeToggle from "./ThemeToggle";
import { showAlert } from "./utils";
import Logo from "./Logo";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = () => {
    logout();
    showAlert("info", "User logged out successfully.");
  };

  return (
    <div className="absolute z-10 w-full">
      <nav className="flex items-center justify-between px-4 py-4">
        <Link className="text-3xl font-bold leading-none" to="/">
          <Logo className="h-16" />
        </Link>
        <ul className="mr-32 flex flex-wrap items-center gap-x-6 text-xl">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-white transition-all hover:text-[rgb(239,68,68)]"
                  : "font-medium text-gray-400 transition-all hover:text-[rgb(239,68,68)]"
              }
            >
              صفحه اصلی
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="/dashboard/"
              className="font-medium text-gray-400 transition-all hover:text-[rgb(59,130,246)]"
            >
              داشبورد
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="font-medium text-gray-400 transition-all hover:text-[rgb(234,179,8)]"
            >
              ادیتور
            </NavLink>
          </li>
          <li className="text-gray-300">|</li>
          <li>
            <NavLink
              to="#"
              className="font-medium text-gray-400 transition-all hover:text-[rgb(34,197,94)]"
            >
              درباره ما
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <Button
                onPress={onOpen}
                className="rounded-xl bg-red-500 px-6 py-2 font-bold text-white  transition duration-200 hover:bg-red-500"
              >
                خروج از حساب کاربری
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
            </>
          ) : (
            <>
              <Link
                className="rounded-xl bg-gray-50 px-6 py-2 font-bold text-gray-900  transition duration-200 hover:bg-gray-300"
                to="/login"
              >
                ورود به حساب کاربری
              </Link>
              <Link
                className="rounded-xl bg-leva-3 px-6 py-2 font-bold text-white transition duration-200 hover:bg-leva-3/60"
                to="/register"
              >
                ثبت نام
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

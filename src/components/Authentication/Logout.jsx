import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authentications/authSlice";

export default function LogoutModal({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div>
      <button
        className="py-2 px-6 bg-gray-50 hover:bg-gray-300 text-gray-900 font-bold  rounded-xl transition duration-200"
        onClick={() => setIsOpen(true)}
      >
        Logout
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-10 inset-0 flex justify-center items-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            {isOpen && (
              <div className="fixed z-10 inset-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-neutral-950 opacity-75"></div>
                </div>
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="inline-block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align- sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-leva-2 text-white px-4 pt-5 pb-4 sm:p-10 sm:pb-7">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-[1.3rem] leading-6 font-medium"
                            id="modal-headline"
                          >
                            Confirm Logout
                          </h3>
                          <div className="mt-2">
                            <p className="text-md text-gray-200">
                              Are you sure you want to logout?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-leva-1 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

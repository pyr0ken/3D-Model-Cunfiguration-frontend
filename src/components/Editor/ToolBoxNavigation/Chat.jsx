import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useAuthStore } from "../../../store/authStore";
import socket from "../../../socket";

const variants = {
  close: {
    x: -500,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

const Chat = ({ selectedProject, isOpen, setSelectedProject }) => {
  const [msg, setMsg] = useState([]);

  const { user } = useAuthStore();
  const currentUser = user.username

  const messagesEndRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socket.on("FE-receive-message", ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const msg = e.target.value;

      if (msg) {
        socket.emit("BE-send-message", { roomId, msg, sender: currentUser });
        inputRef.current.value = "";
      }
    }
  };

  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`absolute z-10 ml-0 flex h-full w-96 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide">
          {selectedProject}
        </h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex h-full flex-auto flex-col overflow-hidden">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-leva-2 p-4">
          <div className="mb-4 flex h-full flex-col overflow-x-auto">
            <div className="flex h-full flex-col">
              <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-8 rounded-lg p-3">
                  <div className="flex flex-col">
                    <span className="text-left font-mono italic tracking-wide text-white">
                      Mohammad
                    </span>
                    <div className="relative rounded-xl bg-gray-400 px-4 py-2 text-sm text-black shadow">
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-start-6 col-end-13 rounded-lg p-3">
                  <div className="flex flex-col">
                    <div className="relative rounded-xl bg-leva-3/70 px-4 py-2 text-sm text-white shadow">
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-16 w-full flex-row items-center gap-x-3 rounded-xl ">
            <div className="flex-grow">
              <textarea
                ref={inputRef}
                placeholder="Enter your massage..."
                type="text"
                className="min-h-16 w-full resize-none rounded-xl bg-leva-1 px-2 py-2 transition-colors placeholder:text-small hover:bg-leva-1/50 focus:outline-none"
              />
            </div>
            <button onClick={sendMessage} className="flex flex-shrink-0 items-center justify-center rounded-full bg-leva-3 px-2 py-2 text-white transition-colors hover:bg-neutral-950">
              <IoIosSend className="-mt-px h-6 w-6 transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Chat;

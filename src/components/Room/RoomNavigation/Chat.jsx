import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useAuthStore } from "../../../store/authStore";
// import socket from "../../../socket";
import Sender from "./Chat/Sender";
import Me from "./Chat/Me";
import useChatStore from "../../../store/chatStoer";
import { usePubSub } from "@videosdk.live/react-sdk";

const variants = {
  close: {
    x: 500,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

export default function Chat({ isOpen, setSelectedTab }) {
  const { publish, messages: pubSubMessages } = usePubSub("CHAT");

  const { messages, setMessages } = useChatStore();

  const { user } = useAuthStore();
  const userName = user.username;

  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (msg) => {
    if (msg) {
      publish(msg, { persist: true });
      inputRef.current.value = "";
    }
  };

  const handleSendMessage = (msg) => {
    sendMessage(msg);
  };

  const handleEnterMsg = (event, msg) => {
    if (event.key === "Enter" && msg) {
      sendMessage(msg);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    setMessages(pubSubMessages);
    scrollToBottom();
  }, [pubSubMessages]);

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
      style={{direction: "ltr"}}
      className={`absolute z-20 mr-0 flex h-full w-96 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide">گفتگو</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex h-full flex-auto flex-col overflow-hidden">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-leva-2 p-4">
          <div className="no-scrollbar mb-4 flex h-full flex-col overflow-x-auto">
            <div className="flex h-full flex-col">
              <div className="grid grid-cols-12 gap-y-2">
                {messages &&
                  messages.map(({ senderName, message, timestamp }, index) => {
                    if (senderName !== userName) {
                      return (
                        <Sender
                          key={index}
                          name={senderName}
                          text={message}
                          time={timestamp}
                        />
                      );
                    } else {
                      return <Me key={index} text={message} time={timestamp} />;
                    }
                  })}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          <div className="flex h-16 w-full flex-row items-center gap-x-3 rounded-xl ">
            <div className="flex-grow">
              <input
                ref={inputRef}
                onKeyDown={(event) =>
                  handleEnterMsg(event, inputRef.current.value)
                }
                placeholder="پیام خود را وارد کنید..."
                type="text"
                className="w-full resize-none rounded-xl bg-leva-1 px-2 py-2.5 transition-colors placeholder:text-small hover:bg-leva-1/50 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleSendMessage(inputRef.current.value)}
              className="flex flex-shrink-0 items-center justify-center rounded-full bg-leva-3 px-2 py-2 text-white transition-colors hover:bg-neutral-950"
            >
              <IoIosSend className="-mt-px h-6 w-6 transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

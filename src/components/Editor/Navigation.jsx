import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import NavigationLink from "./NavigationLink";
import {
  IoHomeOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoHelpSharp } from "react-icons/io5";
import {
  MdOutlineSpaceDashboard,
  MdOutlineCastConnected,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import useOutsideClick from "./OutsideClick";
import ToolBoxLink from "./ToolBoxLink";
import { IoList } from "react-icons/io5";
import Room from "./ToolBoxNavigation/Room";
import Chat from "./ToolBoxNavigation/Chat";
import Help from "./ToolBoxNavigation/Help";
import Points from "./ToolBoxNavigation/Points";
import Settings from "./ToolBoxNavigation/Settings";
import { CiMicrophoneOff } from "react-icons/ci";
import { LuScreenShareOff } from "react-icons/lu";

const containerVariants = {
  close: {
    width: "5.5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const componentMapping = {
  Points: Points,
  Room: Room,
  Chat: Chat,
  Help: Help,
  Settings: Settings,
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const SelectedComponent = componentMapping[selectedProject];

  const containerControls = useAnimationControls();

  //! TODO FIX PROJECT LINKS BUG.
  //? BUT I THINK YOU DONT NEED IT :)
  // const navigationRef = useRef(null);
  // useOutsideClick(navigationRef, setIsOpen);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsOpen(true);
  //   }, 1500);
  // }, []);

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    // setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="absolute left-0 top-0 z-20 flex h-full flex-col gap-20 rounded-br-[3rem] rounded-tr-[3rem] bg-gradient-to-b from-neutral-900 to-leva-2 px-5 py-5 shadow shadow-neutral-600"
      >
        <div className="flex w-full flex-row place-items-center justify-between">
          <svg
            className={
              isOpen ? "h-10 transition-height" : "h-0 transition-height"
            }
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
          <button
            className="flex rounded-full p-1"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              className="mr-1.5 h-8 w-8 stroke-neutral-200 duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <NavigationLink name="Home" link={"/"} chevron={false}>
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </NavigationLink>
          <NavigationLink name="Dashboard" link={"/dashboard"} chevron={false}>
            <MdOutlineSpaceDashboard className="h-8 w-8 min-w-8" />
          </NavigationLink>

          <hr className="h-1 rounded border-0 bg-leva-3/35" />

          <ToolBoxLink name="Points" setSelectedProject={setSelectedProject}>
            <IoList className="h-8 w-8 min-w-8" />
          </ToolBoxLink>
          <ToolBoxLink name="Chat" setSelectedProject={setSelectedProject}>
            <IoChatboxEllipsesOutline className="h-8 w-8 min-w-8" />
          </ToolBoxLink>
          <ToolBoxLink name="Room" setSelectedProject={setSelectedProject}>
            <MdOutlineCastConnected className="h-8 w-8 min-w-8" />
          </ToolBoxLink>
          <ToolBoxLink name="Help" setSelectedProject={setSelectedProject}>
            <IoHelpSharp className="h-8 w-8 min-w-8" />
          </ToolBoxLink>
          <ToolBoxLink name="Settings" setSelectedProject={setSelectedProject}>
            <IoSettingsOutline className="h-8 w-8 min-w-8" />
          </ToolBoxLink>
        </div>
        <div
          className={`flex ${isOpen ? "flex-row gap-x-5" : "flex-col gap-y-5"} rounded-lg p-2 text-white`}
        >
          <span className="cursor-pointer">
            <CiMicrophoneOff className="h-8 w-8 min-w-8 cursor-pointer text-red-400" />
          </span>
          <span className="cursor-pointer">
            <LuScreenShareOff className="h-8 w-8 min-w-8 cursor-pointer stroke-1 text-red-400" />
          </span>
        </div>
      </motion.nav>
      <AnimatePresence>
        {SelectedComponent && (
          <SelectedComponent
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

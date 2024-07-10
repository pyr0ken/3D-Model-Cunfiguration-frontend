import { useMeeting } from "@videosdk.live/react-sdk";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCpu } from "react-icons/bs";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { FaPaintBrush } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import {
  IoChatboxEllipsesOutline,
  IoHelpSharp,
  IoHomeOutline,
  IoList,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import useRoomStore from "../../../store/roomStore";
import Logo from "../../Core/Logo";
import Ai from "./RoomNavigation/Ai";
import Chat from "./RoomNavigation/Chat";
import Draw from "./RoomNavigation/Draw";
import Help from "./RoomNavigation/Help";
import Members from "./RoomNavigation/Members";
import Points from "./RoomNavigation/Points";
import Settings from "./RoomNavigation/Settings";
import RoomNavigationLink from "./RoomNavigationLink";
import RoomToolBoxLink from "./RoomToolBoxLink";

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
  Members: Members,
  Chat: Chat,
  Draw: Draw,
  Points: Points,
  Help: Help,
  Ai: Ai,
  Settings: Settings,
};

export default function RoomNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const SelectedComponent = componentMapping[selectedTab];

  const containerControls = useAnimationControls();

  const { isOwner } = useRoomStore();

  // VideoSdk
  const {
    muteMic,
    unmuteMic,
    enableScreenShare,
    disableScreenShare,
    localScreenShareOn,
    localMicOn,
  } = useMeeting();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    // setSelectedTab(null);
  };

  const handleToggleMic = () => {
    if (localMicOn) {
      muteMic();
    } else {
      unmuteMic();
    }
  };

  const handleToggleScreenShare = () => {
    if (localScreenShareOn) {
      disableScreenShare();
    } else {
      enableScreenShare();
    }
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="absolute right-0 top-0 z-20 flex h-full flex-col gap-10 rounded-bl-[3rem] rounded-tl-[3rem] bg-gradient-to-b from-neutral-900 to-leva-2 px-5 py-5 shadow shadow-neutral-600"
      >
        <div className="flex w-full place-items-center justify-between">
          <Logo
            className={
              isOpen ? "h-10 transition-height" : "h-0 transition-height"
            }
          />
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
                transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
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
          <RoomNavigationLink name="صفحه اصلی" link={"/"} chevron={false}>
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </RoomNavigationLink>
          <RoomNavigationLink
            name="داشبورد"
            link={"/dashboard"}
            chevron={false}
          >
            <MdOutlineSpaceDashboard className="h-8 w-8 min-w-8" />
          </RoomNavigationLink>

          <hr className="h-1 rounded border-0 bg-leva-3/35" />

          <RoomToolBoxLink
            name="اعضا"
            componentName="Members"
            setSelectedTab={setSelectedTab}
          >
            <FaUsers className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink name="نقاشی" componentName="Draw" setSelectedTab={setSelectedTab}>
            <FaPaintBrush className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink name="گفتگو" componentName="Chat" setSelectedTab={setSelectedTab}>
            <IoChatboxEllipsesOutline className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink
            name="نقطه ها"
            componentName="Points"
            setSelectedTab={setSelectedTab}
          >
            <IoList className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink name="هوش مصنوعی" componentName="Ai" setSelectedTab={setSelectedTab}>
            <BsCpu className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink name="راهنما" componentName="Help" setSelectedTab={setSelectedTab}>
            <IoHelpSharp className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
          <RoomToolBoxLink
            name="تنظیمات مدل"
            componentName="Settings"
            setSelectedTab={setSelectedTab}
          >
            <IoSettingsOutline className="h-8 w-8 min-w-8" />
          </RoomToolBoxLink>
        </div>
        <div className={`flex flex-wrap gap-3 rounded-lg text-white`}>
          <span
            onClick={() => handleToggleMic()}
            className={`cursor-pointer rounded-lg ${localMicOn ? "bg-red-500 hover:bg-red-600" : "hover:bg-neutral-900"} p-2 transition-colors duration-100 hover:stroke-neutral-100`}
          >
            {localMicOn ? (
              <CiMicrophoneOn
                className={`h-8 w-8 min-w-8 cursor-pointer stroke-[0.4] ${localMicOn ? "text-black" : "text-red-400"}`}
              />
            ) : (
              <CiMicrophoneOff
                className={`h-8 w-8 min-w-8 cursor-pointer ${localMicOn ? "text-black" : "text-red-400"}`}
              />
            )}
          </span>

          {isOwner && (
            <span
              onClick={() => handleToggleScreenShare()}
              className={`cursor-pointer rounded-lg ${localScreenShareOn ? "bg-red-500 hover:bg-red-600" : "hover:bg-neutral-900"} p-2 transition-colors duration-100 hover:stroke-neutral-100`}
            >
              {localScreenShareOn ? (
                <LuScreenShare
                  className={`h-8 w-8 min-w-8 cursor-pointer stroke-[1.6] ${localScreenShareOn ? "text-black" : "text-red-400"}`}
                />
              ) : (
                <LuScreenShareOff
                  className={`h-8 w-8 min-w-8 cursor-pointer stroke-1 ${localScreenShareOn ? "text-black" : "text-red-400"}`}
                />
              )}
            </span>
          )}
        </div>
      </motion.nav>
      <AnimatePresence>
        {SelectedComponent && (
          <SelectedComponent
            setSelectedTab={setSelectedTab}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

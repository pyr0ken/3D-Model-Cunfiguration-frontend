import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCpu } from "react-icons/bs";
import { FaPaintBrush } from "react-icons/fa";
import {
  IoHelpSharp,
  IoHomeOutline,
  IoList,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import Ai from "./EditorNavigation/Ai";
import Draw from "./EditorNavigation/Draw";
import Help from "./EditorNavigation/Help";
import Points from "./EditorNavigation/Points";
import Settings from "./EditorNavigation/Settings";
import EditorNavigationLink from "./EditorNavigationLink";
import EditorToolBoxLink from "./EditorToolBoxLink";
import Logo from "../Core/Logo";

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
  Draw: Draw,
  Points: Points,
  Help: Help,
  Ai: Ai,
  Settings: Settings,
};

export default function EditorNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const SelectedComponent = componentMapping[selectedTab];

  const containerControls = useAnimationControls();

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
          <EditorNavigationLink name="صفحه اصلی" link={"/"}>
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </EditorNavigationLink>
          <EditorNavigationLink name="داشبورد" link={"/dashboard"}>
            <MdOutlineSpaceDashboard className="h-8 w-8 min-w-8" />
          </EditorNavigationLink>

          <hr className="h-1 rounded border-0 bg-leva-3/35" />
          <EditorToolBoxLink
            name="تخته مجازی"
            componentName="Draw"
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          >
            <FaPaintBrush className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="نقطه ها"
            componentName="Points"
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          >
            <IoList className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="هوش مصنوعی"
            componentName="Ai"
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          >
            <BsCpu className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="راهنما"
            componentName="Help"
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          >
            <IoHelpSharp className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="تنظیمات مدل ها"
            componentName="Settings"
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          >
            <IoSettingsOutline className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {SelectedComponent && (
          <SelectedComponent setSelectedTab={setSelectedTab} isOpen={isOpen} />
        )}
      </AnimatePresence>
      <ToastContainer rtl />
    </>
  );
}

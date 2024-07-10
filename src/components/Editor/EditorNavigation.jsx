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
  // Settings: Settings,
};

export default function EditorNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const SelectedComponent = componentMapping[selectedProject];

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
        className="absolute left-0 top-0 z-20 flex h-full flex-col gap-10 rounded-br-[3rem] rounded-tr-[3rem] bg-gradient-to-b from-neutral-900 to-leva-2 px-5 py-5 shadow shadow-neutral-600"
      >
        <div className="flex w-full place-items-center justify-between">
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
          <EditorNavigationLink name="Home" link={"/"} chevron={false}>
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </EditorNavigationLink>
          <EditorNavigationLink
            name="Dashboard"
            link={"/dashboard"}
            chevron={false}
          >
            <MdOutlineSpaceDashboard className="h-8 w-8 min-w-8" />
          </EditorNavigationLink>

          <hr className="h-1 rounded border-0 bg-leva-3/35" />
          <EditorToolBoxLink
            name="Draw"
            setSelectedProject={setSelectedProject}
          >
            <FaPaintBrush className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="Points"
            setSelectedProject={setSelectedProject}
          >
            <IoList className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink name="Ai" setSelectedProject={setSelectedProject}>
            <BsCpu className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
          <EditorToolBoxLink
            name="Help"
            setSelectedProject={setSelectedProject}
          >
            <IoHelpSharp className="h-8 w-8 min-w-8" />
          </EditorToolBoxLink>
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
      <ToastContainer position="bottom-left" />
    </>
  );
}

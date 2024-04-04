import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import NavigationLink from "./NavigationLink";
import {
  IoHomeOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdOutlineSpaceDashboard,
  MdOutlineCastConnected,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";
import useOutsideClick from "./OutsideClick";

const containerVariants = {
  close: {
    width: "5rem",
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

const svgVariants = {
  close: {
    rotate: 0,
  },
  open: {
    rotate: 180,
  },
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

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
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-leva-1 flex flex-col z-20 gap-20 py-5 px-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
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
          <button
            className="p-1 rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <NavigationLink name="Home" link={"/"}>
            <IoHomeOutline className="min-w-8 w-8 h-8" />
          </NavigationLink>
          <NavigationLink name="Dashboard" link={"/dashboard"}>
            <MdOutlineSpaceDashboard className="min-w-8 w-8 h-8" />
          </NavigationLink>
          <hr class="h-1 bg-leva-3/35 border-0 rounded" />
          <NavigationLink name="Chat">
            <IoChatboxEllipsesOutline className="min-w-8 w-8 h-8" />
          </NavigationLink>
          <NavigationLink name="Room">
            <MdOutlineCastConnected className="min-w-8 w-8 h-8" />
          </NavigationLink>
          <NavigationLink name="Settings">
            <IoSettingsOutline className="min-w-8 w-8 h-8" />
          </NavigationLink>
        </div>
        <div className="flex flex-col gap-3">
          <ProjectLink
            name="Virtual Reality"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
          </ProjectLink>
          <ProjectLink
            name="Apple Vision Pro"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
          </ProjectLink>
          <ProjectLink name="Porsche" setSelectedProject={setSelectedProject}>
            <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
          </ProjectLink>
          <ProjectLink
            name="Secret Project"
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </ProjectLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
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

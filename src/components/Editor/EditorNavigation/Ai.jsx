import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { variants } from "./utils";
import useCameraStore from "../../../store/cameraStore";


const Ai = ({ selectedProject, isOpen, setSelectedProject }) => {
  const { cameraIsOn, changeCameraStatus } = useCameraStore();

  const handleHandTracker = () => {
    changeCameraStatus();
  };

  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className={`absolute z-20 ml-0 flex h-full w-64 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">{selectedProject}</h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="no-scrollbar mb-2 flex flex-col gap-y-5 overflow-y-auto text-white">
        <div className="flex flex-col">
          <p className="mb-3 text-xl font-semibold">Hand Tracker</p>
          <Button
            className="text-white"
            onClick={handleHandTracker}
            variant="shadow"
            color={cameraIsOn ? "danger" : "success"}
          >
            {cameraIsOn ? "Off" : "On"}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Ai;

import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FaHandPointUp } from "react-icons/fa6";
import { variants } from "./utils";


const Help = ({ selectedProject, isOpen, setSelectedProject }) => {
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
      className={`absolute z-10 ml-0 flex h-full w-72 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">{selectedProject}</h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col gap-y-4 text-white">
        <div className="flex flex-col rounded-md bg-leva-3/50 p-4">
          <p className="font-semibold">shift + left click on model :</p>
          <p className="text-center">add point</p>
        </div>
        <div className="flex flex-col rounded-md bg-leva-3/40 p-4">
          <p className="font-semibold">right click on points :</p>
          <p className="text-center">add note to selected point</p>
        </div>
        <div className="flex flex-col rounded-md bg-leva-3/30 p-4">
          <p className="font-semibold">ctrl + z :</p>
          <p className="text-center">remove last point</p>
        </div>
        <div className="flex flex-col rounded-md bg-leva-3/20 p-4">
          <p className="font-semibold">mouse wheel :</p>
          <p className="text-center"> zoom in and zoom out</p>
        </div>
      </div>
    </motion.nav>
  );
};

export default Help;

import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import usePointsStore from "../../../store/pointStore";

const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

const Points = ({ selectedProject, isOpen, setSelectedProject }) => {
  const { points, addPoint, removePoint, updatePoint } = usePointsStore();

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
      className={`absolute z-10 ml-0 flex h-full w-64 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
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
        {points.length > 0 ? (
          points.map((point, index) => (
            <div
              key={index}
              className="relative rounded-md bg-blue-300/20 p-2 text-center"
            >
              {/* TODO: FIX IT FOR BIG INDEX LIKE >= 100 */}
              <span
                className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: point.color }}
              >
                {index + 1}
              </span>
              <div className="mt-6">
                <div className="flex justify-between">
                  <strong>Note:</strong>
                  <span>{point.note ? point.note : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <strong>Radius:</strong>
                  <span>{Math.round(point.radius * 100) / 100}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">:-: There Is no points :-:</p>
        )}
      </div>
    </motion.nav>
  );
};

export default Points;

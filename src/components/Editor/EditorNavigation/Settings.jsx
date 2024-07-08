import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { motion } from "framer-motion";
import useEditorStore from "../../../store/editorStore";
import ModelsPopupList from "../OpenEditorModel/ModelsPopupList";
import { variants } from "./utils";


const Settings = ({ selectedProject, isOpen, setSelectedProject }) => {
  const {
    isEditModalOpen,
    selectedModel,
    setIsEditModalOpen,
    setSelectedModel,
    setCloseModel,
  } = useEditorStore();
  
  const handleCloseMode = () => {
    setSelectedModel(null);
    setCloseModel(true);
    setIsEditModalOpen(false);
  };

  const handleAddModel = () => {
    setIsEditModalOpen(true);
  };

  const handleSelectedModel = (model) => {
    setSelectedModel(model);
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
      className={`absolute z-20 ml-0 flex h-full w-72 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">{selectedProject}</h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col gap-5 text-white">
        <div className="flex flex-col">
          <p className="mb-4 text-xl font-semibold">Models List</p>
          <div className="cursor-pointer rounded-br-xl rounded-tr-xl border-l-3 bg-leva-2 font-mono ">
            {/* {allModels.data.models.length > 0 &&
              allModels.data.models.map((model, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => handleSelectedModel(model)}
                    className={`${model.id === selectedModel?.id ? "bg-leva-3 hover:bg-leva-3" : ""} p-2 transition-colors first:rounded-tr-xl last:rounded-br-xl hover:bg-leva-3/40`}
                  >
                    {model.display_name}
                  </p>
                );
              })} */}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button variant="shadow" onClick={handleAddModel} color="success">
            Open New Model
          </Button>
          {selectedModel && (
            <Button variant="shadow" onClick={handleCloseMode} color="danger">
              Close Model
            </Button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        size="3xl"
        onClose={() => setIsEditModalOpen(false)}
        placement="top-center"
        className="h-[85vh] overflow-y-auto dark"
      >
        <ModalContent>
          <ModalBody>
            <ModelsPopupList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </motion.nav>
  );
};

export default Settings;

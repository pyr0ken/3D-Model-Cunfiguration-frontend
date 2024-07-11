import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import useEditorStore from "../../../store/editorStore";
import ModelsPopupList from "../OpenEditorModel/ModelsPopupList";
import { variants } from "./utils";

const Settings = ({ isOpen, setSelectedTab }) => {
  const {
    editModels,
    isEditModalOpen,
    selectedModel,
    setIsEditModalOpen,
    setSelectedModel,
    removeEditModel,
  } = useEditorStore();

  const handleCloseMode = () => {
    setSelectedModel(null);
    setIsEditModalOpen(false);
  };

  const handleAddModel = () => {
    setIsEditModalOpen(true);
  };

  const handleSelectedModel = (editModel) => {
    setSelectedModel(editModel);
  };

  const handleDeleteRoomModel = (editModelId) => {
    removeEditModel(editModelId);
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
      className={`absolute z-20 mr-0 flex h-full w-72 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">تنظمات مدل ها</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col gap-5 text-white">
        <div className="flex flex-col">
          <p className="mb-4 text-xl font-semibold">
            لیست مدل های باز شده در ادیتور
          </p>
          <div className="cursor-pointer rounded-bl-xl rounded-tl-xl border-r-3 bg-leva-2 ">
            {editModels.length > 0 &&
              editModels.map((editModel, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectedModel(editModel)}
                    className={`${editModel.id === selectedModel?.id ? "bg-leva-3 hover:bg-leva-3" : ""} flex items-center justify-between bg-leva-2/50 p-2 transition-colors first:rounded-tl-xl last:rounded-bl-xl hover:bg-leva-3/40`}
                  >
                    <p>{editModel.display_name}</p>
                    <span
                      onClick={() => handleDeleteRoomModel(editModel.id)}
                      className="flex cursor-pointer items-center rounded-full bg-red-500 p-1 hover:bg-red-600"
                    >
                      <RiDeleteBin6Line className="h-5 min-w-4" />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button variant="shadow" onClick={handleAddModel} color="success">
            باز کردن مدل جدید
          </Button>
          {selectedModel && (
            <Button variant="shadow" onClick={handleCloseMode} color="danger">
              بستن مدل فعلی
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

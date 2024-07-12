import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
} from "@nextui-org/react";
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

  const handleCloseModel = () => {
    setSelectedModel(null);
    setIsEditModalOpen(false);
  };

  const handleAddModel = () => {
    setIsEditModalOpen(true);
  };

  const handleSelectedModel = (editModel) => {
    setSelectedModel(editModel);
  };

  const handleDeleteEditModel = (editModelId) => {
    removeEditModel(editModelId);
    setSelectedModel(null);
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
      <ScrollShadow hideScrollBar>
        <div className="no-scrollbar flex flex-col gap-5 overflow-y-scroll text-white">
          <div className="flex flex-col">
            <p className="mb-4 text-xl font-semibold">
              لیست مدل های باز شده در ادیتور
            </p>
            <div className="flex cursor-pointer flex-col gap-y-2 rounded border-r-3">
              {editModels.length > 0 &&
                editModels.map((editModel, index) => {
                  return (
                    <div className="flex justify-between" key={index}>
                      <p
                        onClick={() => handleSelectedModel(editModel)}
                        className={`${editModel.id === selectedModel?.id ? "bg-leva-3 hover:bg-leva-3" : "hover:bg-leva-3/40"} flex w-full items-center justify-between p-2 transition-colors`}
                      >
                        {editModel.display_name}
                      </p>
                      <span
                        onClick={() => handleDeleteEditModel(editModel.id)}
                        className="flex items-center rounded-l-xl bg-red-500 p-2 transition-colors hover:bg-red-600"
                      >
                        <RiDeleteBin6Line className="size-5" />
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
              <Button
                variant="shadow"
                onClick={handleCloseModel}
                color="danger"
              >
                بستن مدل فعلی
              </Button>
            )}
          </div>
        </div>
      </ScrollShadow>
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

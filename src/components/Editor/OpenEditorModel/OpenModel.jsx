import { TbCubePlus } from "react-icons/tb";
import ModelsPopupList from "./ModelsPopupList";
import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import useEditorStore from "../../../store/editorStore";

export default function () {
  const { isEditModalOpen, setIsEditModalOpen } = useEditorStore();

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <TbCubePlus className="size-52 text-gray-400" />
      <div className="text-center text-gray-400">
        <p className="text-2xl">هنوز هیچ مدلی افزوده نشده است.</p>
        <p className="text-xl">شما می توانید هر مدلی را همین الان باز کنید!</p>
      </div>
      <Button
        onClick={() => setIsEditModalOpen(true)}
        variant="shadow"
        color="primary"
        size="lg"
      >
       افزودن مدل
      </Button>
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
    </div>
  );
}

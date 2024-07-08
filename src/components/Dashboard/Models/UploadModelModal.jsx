import UploadModel from "./UploadModel";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

export default function UploadModelModal({
  isUploadModalOpen,
  setIsUploadModalOpen,
  refetch,
}) {
  return (
    <Modal
      isOpen={isUploadModalOpen}
      size="3xl"
      onClose={() => setIsUploadModalOpen(false)}
      placement="top-center"
      className="h-[70vh] dark"
    >
      <ModalContent>
        <ModalBody>
          <UploadModel
            setIsUploadModalOpen={setIsUploadModalOpen}
            refetch={refetch}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

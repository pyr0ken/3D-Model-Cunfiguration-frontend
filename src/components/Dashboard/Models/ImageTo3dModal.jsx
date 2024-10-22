import ImageTo3d from "./ImageTo3d";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

export default function ImageTo3dModal({
  is2dto3dModalOpen,
  isGenerating3dModel,
  setIs2dto3dModalOpen,
  setIsGenerating3dModel,
  uploadedModelRefetch,
}) {
  return (
    <Modal
      isOpen={is2dto3dModalOpen}
      size="3xl"
      onClose={() => setIs2dto3dModalOpen(false)}
      placement="top-center"
      className="h-[70vh] dark"
    >
      <ModalContent>
        <ModalBody>
          <ImageTo3d
            setIs2dto3dModalOpen={setIs2dto3dModalOpen}
            isGenerating3dModel={isGenerating3dModel}
            setIsGenerating3dModel={setIsGenerating3dModel}
            uploadedModelRefetch={uploadedModelRefetch}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

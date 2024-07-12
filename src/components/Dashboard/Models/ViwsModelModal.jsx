import { Suspense } from "react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelView from "./ModelView";
import Placeholder from "../../Model/Placeholder";

export default function ViewModelModal({
  isViewModalOpen,
  setIsViewModalOpen,
  modelFileURL,
  setModelFileURL,
}) {
  return (
    <Modal
      isOpen={isViewModalOpen}
      size="3xl"
      onClose={() => setIsViewModalOpen(false)}
      placement="top-center"
      className="h-[70vh] dark"
    >
      <ModalContent>
        <ModalBody>
          <div className="relative h-screen w-full">
            <Canvas>
              <OrbitControls autoRotate enablePan />

              <ambientLight intensity={3} />
              <directionalLight intensity={6} />
              <pointLight intensity={5} />

              <Suspense fallback={<Placeholder />}>
                <ModelView modelFileURL={modelFileURL} />
              </Suspense>
            </Canvas>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

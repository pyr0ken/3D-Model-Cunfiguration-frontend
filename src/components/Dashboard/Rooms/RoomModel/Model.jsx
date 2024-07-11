import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState } from "react";
import {
  CiZoomIn as ZoomInIcon,
  CiZoomOut as ZoomOutIcon,
} from "react-icons/ci";
import usePoints from "../../../../hooks/model/usePoints";
import useRoomStore from "../../../../store/roomStore";
import Placeholder from "../../../Models/Placeholder";
import LoadModel from "./LoadModel";
import NoteModal from "./NoteModal";

export default function Model() {
  const [showZoomInIcon, setShowZoomInIcon] = useState(false);
  const [showZoomOutIcon, setShowZoomOutIcon] = useState(false);

  // Room Model state
  const { selectedModel, aiCameraIsOn, reloadModelKey, changeAiCameraStatus, changeReloadModelKey } =
    useRoomStore();

  // note state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { refetch } = usePoints(selectedModel.id);

  const { Monitoring, ZoomIcons, ZoomToCursor, AutoRotate, Pan } = useControls(
    "Base",
    {
      Monitoring: false,
      ZoomIcons: true,
      ZoomToCursor: false,
      AutoRotate: false,
      Pan: false,
      "Reload Model": button(() => {
        if (aiCameraIsOn) {
          changeAiCameraStatus();
          changeReloadModelKey();
        } else {
          changeReloadModelKey();
        }
      }),
    },
  );

  const { ambientLight, directionalLight, pointLight } = useControls("Light", {
    ambientLight: {
      min: 0,
      max: 10,
      value: 3,
      step: 0.01,
    },
    directionalLight: {
      min: 0,
      max: 10,
      value: 6,
      step: 0.01,
    },
    pointLight: {
      min: 0,
      max: 10,
      value: 5,
      step: 0.01,
    },
  });

  useEffect(() => {
    const zoomInTimer = setTimeout(() => {
      setShowZoomInIcon(false);
    }, 200);

    const zoomOutTimer = setTimeout(() => {
      setShowZoomOutIcon(false);
    }, 200);

    return () => {
      clearTimeout(zoomInTimer);
      clearTimeout(zoomOutTimer);
    };
  }, [showZoomInIcon, showZoomOutIcon]);

  const handleModelWheel = (event) => {
    // if deltaY is negative that means zoom in else if deltaY is positive it's zoom out,
    if (event.deltaY < 0) {
      setShowZoomInIcon(true);
    } else {
      setShowZoomOutIcon(true);
    }
  };

  return (
    <div className="h-screen w-screen">
      <Canvas
        key={reloadModelKey}
        gl={{ preserveDrawingBuffer: true }}
        onWheel={handleModelWheel}
      >
        {/* Movement controll */}
        <OrbitControls
          maxDistance={20}
          autoRotate={AutoRotate}
          zoomToCursor={ZoomToCursor}
          enablePan={Pan}
        />

        {/* Lighting */}
        <ambientLight intensity={ambientLight} />
        <directionalLight intensity={directionalLight} />
        <pointLight intensity={pointLight} />

        {/* <Environment preset="sunset" /> */}

        {/* Zoom in & Zoom out icons */}
        {ZoomIcons && (
          <Html center>
            {showZoomInIcon && (
              <ZoomInIcon className="text-[10rem] text-gray-200 opacity-70" />
            )}
            {showZoomOutIcon && (
              <ZoomOutIcon className="text-[10rem] text-gray-200 opacity-70" />
            )}
          </Html>
        )}

        {/* Load GLTF Model */}
        <Suspense fallback={<Placeholder />}>
          <LoadModel
            selectedPoint={selectedPoint}
            isNoteModalOpen={isNoteModalOpen}
            setSelectedPoint={setSelectedPoint}
            setIsNoteModalOpen={setIsNoteModalOpen}
            setSelectedModalOpen={setIsNoteModalOpen}
          />
        </Suspense>

        {/* Show Performance */}
        {Monitoring && <Perf position="bottom-left" />}
      </Canvas>
      <NoteModal
        selectedPoint={selectedPoint}
        isNoteModalOpen={isNoteModalOpen}
        setIsNoteModalOpen={setIsNoteModalOpen}
        refetch={refetch}
      />
    </div>
  );
}

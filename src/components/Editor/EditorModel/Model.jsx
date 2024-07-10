import { CiZoomIn as ZoomInIcon } from "react-icons/ci";
import { CiZoomOut as ZoomOutIcon } from "react-icons/ci";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState, useRef } from "react";
import LoadModel from "./LoadModel";
import Placeholder from "../../Models/Placeholder";
import NoteModal from "./NoteModal";
import usePoints from "../../../hooks/model/usePoints";

export default function Model({ selectedModel  }) {
  const [showZoomInIcon, setShowZoomInIcon] = useState(false);
  const [showZoomOutIcon, setShowZoomOutIcon] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // note state
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { refetch } = usePoints(selectedModel.id);

  const { Monitoring, ZoomIcons, ZoomToCursor, AutoRotate, Pan, HelpText } =
    useControls("Base", {
      Monitoring: false,
      ZoomIcons: true,
      ZoomToCursor: false,
      AutoRotate: false,
      Pan: false,
      "Reload Model": button(() => {
        setReloadKey((prevKey) => prevKey + 1);
      }),
    });

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
        key={reloadKey}
        camera={{}}
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
            selectedModel={selectedModel}
            selectedPoint={selectedPoint}
            isNoteModalOpen={isNoteModalOpen}
            setSelectedPoint={setSelectedPoint}
            setIsNoteModalOpen={setIsNoteModalOpen}
          />
        </Suspense>

        {/* Show Performance */}
        {Monitoring && <Perf position="bottom-right" />}
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

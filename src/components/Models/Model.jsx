import { CiZoomIn as ZoomInIcon } from "react-icons/ci";
import { CiZoomOut as ZoomOutIcon } from "react-icons/ci";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState, useRef } from "react";
import LoadModel from "./LoadModel";
import Placeholder from "./Placeholder";
import { Leva } from "leva";

export default function Model(props) {
  const [showZoomInIcon, setShowZoomInIcon] = useState(false);
  const [showZoomOutIcon, setShowZoomOutIcon] = useState(false);

  const { Monitoring, ZoomIcons, ZoomToCursor, AutoRotate, Pan, HelpText } =
    useControls("Base", {
      Monitoring: false,
      ZoomIcons: true,
      ZoomToCursor: false,
      AutoRotate: false,
      Pan: false,
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
    <div {...props}>
      <Canvas onWheel={handleModelWheel}>
        {/* Basic Setup */}
        <OrbitControls
          autoRotate={AutoRotate}
          zoomToCursor={ZoomToCursor}
          enablePan={Pan}
          onChange={(e) => {
            const { object } = e.target;
            const rotationInDegrees = {
              x: object.rotation.x,
              y: object.rotation.y,
            };
            console.log("camera", rotationInDegrees);
          }}
        />
        <ambientLight intensity={ambientLight} />
        <directionalLight intensity={directionalLight} />
        <pointLight intensity={pointLight} />
        {/* <Environment preset="sunset" /> */}
        {/* Zoom in & Zoom out icons */}
        {ZoomIcons && (
          <Html center>
            {showZoomInIcon && (
              <ZoomInIcon style={{ fontSize: "10rem", color: "#fff9" }} />
            )}
            {showZoomOutIcon && (
              <ZoomOutIcon style={{ fontSize: "10rem", color: "#fff9" }} />
            )}
          </Html>
        )}
        {/* Load GLTF Model */}
        <Suspense fallback={<Placeholder />}>
          <LoadModel file={props.file} />
        </Suspense>
        {/* Show Perforamnce */}
        {Monitoring && <Perf position="bottom-right" />}
      </Canvas>
    </div>
  );
}

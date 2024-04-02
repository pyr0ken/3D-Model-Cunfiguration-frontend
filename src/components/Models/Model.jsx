import { CiZoomIn as ZoomInIcon } from "react-icons/ci";
import { CiZoomOut as ZoomOutIcon } from "react-icons/ci";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useState } from "react";
import LoadModel from "../LoadModel";
import Placeholder from "./Placeholder";
import MouseTracker from "./MouseTracker";
import HelperText from "./HelperText";
import { Leva } from "leva";

export default function Model(props) {
  const [showZoomInIcon, setShowZoomInIcon] = useState(false);
  const [showZoomOutIcon, setShowZoomOutIcon] = useState(false);

  const { Monitoring, ZoomIcons, ZoomToCursor, AutoRotate, Pan, HelpText } =
    useControls("base", {
      Monitoring: false,
      ZoomIcons: true,
      ZoomToCursor: false,
      AutoRotate: false,
      Pan: false,
      HelpText: false,
    });

  useEffect(() => {
    const zoomInTimer = setTimeout(() => {
      setShowZoomInIcon(false);
    }, 300);

    const zoomOutTimer = setTimeout(() => {
      setShowZoomOutIcon(false);
    }, 300);

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
      <MouseTracker />

      <Canvas onWheel={handleModelWheel}>
        {/* Basic Setup */}
        <OrbitControls
          autoRotate={AutoRotate}
          zoomToCursor={ZoomToCursor}
          enablePan={Pan}
          onChange={(e) => console.log(e.target.object)}
        />
        <ambientLight intensity={3} />
        <directionalLight intensity={6} />
        {/* <Environment preset="sunset" /> */}

        {/* Helper Text */}
        {HelpText && <HelperText />}

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
          <LoadModel scale={0.8} />
        </Suspense>

        {/* Show Perforamnce */}
        {Monitoring && <Perf position="bottom-right" />}
      </Canvas>
    </div>
  );
}

import { Html, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { usePubSub } from "@videosdk.live/react-sdk";
import { button, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import useAddPoint from "../../../../hooks/model/useAddPoints";
import useDeletePoint from "../../../../hooks/model/useDeletePoint";
import usePoints from "../../../../hooks/model/usePoints";
import { BASE_URL } from "../../../../services";
import useRoomStore from "../../../../store/roomStore";

function getFirstWords(text, wordsNumber) {
  const words = text.split(" ");
  const firstWords = words.slice(0, wordsNumber).join(" ");
  return words.length > wordsNumber ? `${firstWords}...` : firstWords;
}

export default function LoadModel({
  isNoteModalOpen,
  setSelectedPoint,
  setIsNoteModalOpen,
}) {
  // state
  const [hoverPointId, setHoverPointId] = useState(null);
  const {selectedModel, setSelectedModel} = useRoomStore()

  // Load Model with useGLTF
  const { nodes, materials } = useGLTF(BASE_URL + selectedModel.file);
  const meshes = Object.values(nodes).filter((value) => value.type === "Mesh");

  // Point and Note CRUD methods
  const {
    data: points,
    isLoading: pointsIsLoading,
    error,
    refetch,
  } = usePoints(selectedModel.id);
  const { mutate: addPoint } = useAddPoint();
  const { mutate: deletePoint } = useDeletePoint();

  // ThreeJs
  const { camera, gl } = useThree();

  // Ref
  const modelRef = useRef();

  // Ai Store for hand tracker rotation
  const { aiRotation, clearAiRotation } = useRoomStore();

  // VideoSdk PubSub for new point or note
  const { publish: pointPublish } = usePubSub("POINT", {
    onMessageReceived: () => {
      refetch();
    },
  });
  
  // Controllers
  const { scale, positionY, resetCamera } = useControls("Model", {
    scale: {
      min: 0,
      max: 10,
      value: 2,
    },
    positionY: {
      min: -10,
      max: 10,
      value: 0,
      step: 0.01,
    },
    "Reset Camera": button(() => {
      camera.position.set(0, 0, 5);
    }),
    "Take ScreenShot": button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream"),
      );
      link.click();
    }),
  });

  const { pointIndex, pointColor, pointRadius } = useControls("Point", {
    pointIndex: false,
    pointColor: "#007BFF",
    pointRadius: {
      min: 0,
      max: 0.1,
      value: 0.05,
    },
  });

  useEffect(() => {
    if (aiRotation) {
      modelRef.current.rotation.set(aiRotation.x, aiRotation.y, 0);
    }
  }, [aiRotation]);

  const handleModelClick = (event) => {
    event.stopPropagation();

    if (event.shiftKey) {
      const mousePoint = new Vector3(
        event.point.x,
        event.point.y,
        event.point.z,
      );

      const newPoint = {
        edit_model_id: selectedModel.id,
        position: `${mousePoint.x},${mousePoint.y},${mousePoint.z}`,
        color: pointColor,
        radius: pointRadius,
      };

      addPoint(newPoint, {
        onSuccess: (res) => {
          refetch();
          pointPublish("New Point", { persist: true });
        },
        onError: (err) => console.log(err),
      });
    }
  };

  const handlePointContextMenu = (event, point) => {
    event.stopPropagation();
    setSelectedPoint(point);
    setIsNoteModalOpen(true);
  };

  const handlePointOver = (event, note, pointId) => {
    event.stopPropagation();
    event.object.material.color.set("yellow");
    if (note) {
      setHoverPointId(pointId);
    }
  };

  const handlePointOut = (event, color) => {
    event.stopPropagation();
    event.object.material.color.set(color);
    setHoverPointId(null);
  };

  const getPositionVector3 = (input) => {
    const [x, y, z] = input.split(",").map(Number);

    return new Vector3(x, y, z);
  };

  return (
    <>
      <group ref={modelRef} dispose={null}>
        <group
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, positionY, 0]}
          scale={scale}
        >
          {meshes.map((mesh) => (
            <mesh
              key={mesh.name}
              onClick={handleModelClick}
              geometry={mesh.geometry}
              material={materials[mesh.material.name]}
            ></mesh>
          ))}
        </group>
      </group>

      {!pointsIsLoading &&
        points.map((point, index) => (
          <mesh
            key={index}
            position={getPositionVector3(point.position)}
            onContextMenu={(event) => handlePointContextMenu(event, point)}
            onPointerOver={(event) =>
              handlePointOver(event, point.note, point.id)
            }
            onPointerOut={(event) => handlePointOut(event, point.color)}
          >
            <sphereGeometry args={[point.radius]} />
            <meshBasicMaterial color={point.color} />
            {pointIndex && (
              <Html className="flex" distanceFactor={4}>
                <span className="select-none font-extrabold text-gray-300">
                  {index + 1}
                </span>
              </Html>
            )}
            {point.note && !isNoteModalOpen && hoverPointId == point.id && (
              <Html
                className="flex h-7 w-40 overflow-hidden"
                distanceFactor={5}
              >
                <span className="select-none rounded-xl bg-neutral-950/60 p-1 text-tiny text-gray-300">
                  {getFirstWords(point.note, 3)}
                </span>
              </Html>
            )}
          </mesh>
        ))}
    </>
  );
}

// useGLTF.preload("/Heart-01.gltf");

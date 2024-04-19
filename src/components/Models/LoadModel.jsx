import { Html, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import usePointsStore from "../../store/pointStore";

function getFirstWords(text, wordsNumber) {
  const words = text.split(" ");
  const firstWords = words.slice(0, wordsNumber).join(" ");
  return words.length > wordsNumber ? `${firstWords}...` : firstWords;
}

export default function LoadModel(props) {
  const { points, addPoint, removePoint, updatePoint } = usePointsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelRotation, setModelRotation] = useState([0, 0, 0]);

  const { nodes, materials } = useGLTF(`http://127.0.0.1:8000${props.file}`);
  const meshes = Object.values(nodes).filter((value) => value.type === "Mesh");
  const { camera } = useThree();

  const modelRef = useRef();
  const noteRef = useRef();
  const pointRef = useRef();

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
    "Reload Model": button(() => {
      window.location.reload();
    }),
    // choice: { options: ["a", "b", "c"] },
  });

  const { pointColor, pointRadius } = useControls("Point", {
    pointColor: "#007BFF",
    pointRadius: {
      min: 0,
      max: 0.1,
      value: 0.05,
    },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "z" && e.ctrlKey) {
        console.log("Before", points);
        const removePointIndex = points.length - 1;
        removePoint(removePointIndex);
        console.log("After", points);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [points, removePoint]);

  const handleModelClick = (event) => {
    event.stopPropagation();

    if (event.shiftKey) {
      const mousePoint = new Vector3(
        event.point.x,
        event.point.y,
        event.point.z,
      );

      const newPoint = {
        position: mousePoint,
        note: "",
        color: pointColor,
        radius: pointRadius,
      };

      addPoint(newPoint);
    }
  };

  const handlePointContextMenu = (event, pointData) => {
    pointRef.current = pointData;
    setIsModalOpen(true);
  };

  const handlePointOver = (event) => {
    event.object.material.color.set("yellow");
  };

  const handlePointOut = (event, color) => {
    event.object.material.color.set(color);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveText = (event) => {
    const note = noteRef.current.value;
    const pointIndex = pointRef.current.index;

    updatePoint(pointIndex, { ...points[pointIndex], note });
    handleCloseModal();
  };

  const handleDeletePoint = () => {
    const pointIndex = pointRef.current.index;
    removePoint(pointIndex);
    handleCloseModal();
  };

  const handleDeleteNote = () => {
    const pointIndex = pointRef.current.index;
    updatePoint(pointIndex, { ...points[pointIndex], note: "" });
    handleCloseModal();
  };

  const getPointNote = () => {
    if (pointRef.current.point.note !== undefined) {
      return pointRef.current.point.note;
    }
    return "";
  };

  return (
    <>
      <group {...props} ref={modelRef} dispose={null}>
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

      {points.map((point, index) => (
        <mesh
          key={index}
          position={point.position}
          onContextMenu={(event) =>
            handlePointContextMenu(event, { point: point, index: index })
          }
          onPointerOver={handlePointOver}
          onPointerOut={(event) => handlePointOut(event, point.color)}
        >
          <sphereGeometry args={[point.radius]} />
          <meshBasicMaterial color={point.color} />
          {/* <Html className="flex" distanceFactor={5}>
            <span className="select-none text-gray-300">1</span>
          </Html> */}
          {point.note && !isModalOpen && (
            <Html className="flex h-7 w-40 overflow-auto" distanceFactor={5}>
              <span className="select-none rounded-xl bg-neutral-950/60 p-1 text-tiny text-gray-300">
                {getFirstWords(point.note, 3)}
              </span>
            </Html>
          )}
        </mesh>
      ))}
      <Html>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          placement="top-center"
          className="text-white dark"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add & Edit Note
            </ModalHeader>
            <ModalBody>
              <Textarea
                ref={noteRef}
                autoFocus
                label="Note"
                defaultValue={getPointNote}
                placeholder="Enter your note..."
                variant="flat"
              />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <div className="space-x-2">
                <Button color="danger" onClick={handleDeletePoint}>
                  Delete Point
                </Button>
                <Button color="danger" onClick={handleDeleteNote}>
                  Delete Note
                </Button>
              </div>
              <Button color="primary" onClick={handleSaveText}>
                Save Note
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Html>
    </>
  );
}

// useGLTF.preload("/Heart-01.gltf");

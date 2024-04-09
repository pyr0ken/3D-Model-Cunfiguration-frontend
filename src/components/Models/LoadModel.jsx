import {
  Html,
  useGLTF,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useRef, useState } from "react";
import * as THREE from "three";

export default function LoadModel(props) {
  const { nodes, materials } = useGLTF(`http://127.0.0.1:8000${props.file}`);

  const { camera } = useThree();
  const modelRef = useRef();

  const { resetCamera } = useControls("model", {
    "Reset Camera": button(() => {
      camera.position.set(0, 0, 5);
    }),
    "Reload Model": button(() => {
      window.location.reload();
    }),
    // choice: { options: ["a", "b", "c"] },
    // position: {
    //   value: { x: -2, y: 0 },
    //   step: 0.01,
    //   joystick: "invertY",
    // },
  });

  const { pointColor, pointRadius } = useControls("point", {
    pointColor: "#007BFF",
    pointRadius: {
      min: 0,
      max: 0.1,
      value: 0.05,
    },
  });

  const noteRef = useRef();
  const pointRef = useRef();

  const [points, setPoints] = useState([]);
  const [showInput, setShowInput] = useState(false);

  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 90 && e.ctrlKey == true) {
      setPoints(points.slice(0, -1));
    }
  });

  const handleModelClick = (event) => {
    if (event.shiftKey) {
      const mousePoint = new THREE.Vector3(
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

      setPoints([...points, newPoint]);
    }
  };

  const handlePointContextMenu = (event, pointData) => {
    pointRef.current = pointData;
    setShowInput(true);
  };

  const handlePointOver = (event) => {
    event.object.material.color.set("yellow");
  };

  const handlePointOut = (event, color) => {
    event.object.material.color.set(color);
  };

  const handleSaveText = (event) => {
    const note = noteRef.current.value;
    const pointIndex = pointRef.current.index;

    setPoints(
      points.map((point, index) => {
        if (index === pointIndex) {
          return { ...point, note };
        }
        return point;
      }),
    );

    setShowInput(false);
  };

  return (
    <>
      {/* <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={200}
        fixed={true}
      > */}
      <group {...props} ref={modelRef} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={2.363}>
          <mesh
            onClick={handleModelClick}
            geometry={nodes.hartZBrush_defualt_group.geometry}
            material={materials["Heart Tex"]}
          />
        </group>
      </group>
      {/* </PivotControls> */}

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
          {point.note && !showInput && (
            <Html wrapperClass="PointNoteBox" distanceFactor={5}>
              <span>{point.note}</span>
            </Html>
          )}
        </mesh>
      ))}
      {showInput && (
        <Html center className="NoteBox">
          <div>
            <h1> Note </h1>
            <textarea
              ref={noteRef}
              type="text"
              defaultValue={pointRef.current.point.note}
              placeholder="Enter some description..."
            />
            <button onClick={handleSaveText}>Save</button>
          </div>
        </Html>
      )}
    </>
  );
}

// useGLTF.preload("/Heart-01.gltf");

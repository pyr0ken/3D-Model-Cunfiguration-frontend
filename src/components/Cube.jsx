import { React, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export default function Cube() {
  const boxRef = useRef();

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <mesh
      ref={boxRef}
      rotation-z={Math.PI * 0.2}
      rotation-y={Math.PI * 0.25}
      scale={4.5}
    >
      <boxGeometry />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}

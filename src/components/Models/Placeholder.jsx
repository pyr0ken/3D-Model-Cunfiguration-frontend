import { Html, useProgress } from "@react-three/drei";

export default function Placeholder() {
  const { prograss } = useProgress();

  return (
    <>
      <mesh
        rotation-y={Math.PI * 0.25}
        rotation-x={Math.PI * 0.15}
        position-y={0.5}
        scale={2.5}
      >
        <boxGeometry />
        <meshNormalMaterial wireframe />
        <Html center style={{ fontSize: "2rem" }}>
          {prograss} Loading ...
        </Html>
      </mesh>
    </>
  );
}

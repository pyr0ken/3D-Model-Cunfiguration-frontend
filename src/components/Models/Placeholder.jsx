import { Html, useProgress } from "@react-three/drei";

export default function Placeholder() {
  const { progress } = useProgress();

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
        <Html center className="text-3xl flex flex-wrap text-white break-words">
          {progress} در حال بارگزاری مدل
        </Html>
      </mesh>
    </>
  );
}

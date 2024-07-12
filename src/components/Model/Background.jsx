import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";

export default function Background() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <OrbitControls />
        <ambientLight color={"#007BFF"} />
        <Cube />
      </Canvas>
    </div>
  );
}

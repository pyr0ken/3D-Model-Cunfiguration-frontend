import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";

export default function Background() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ambientLight color={"#007BFF"} />
        <Cube />
      </Canvas>
    </div>
  );
}

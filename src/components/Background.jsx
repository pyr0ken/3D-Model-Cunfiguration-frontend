import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";

export default function Background() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ambientLight color={"#16A34A"} />
        <Cube />
      </Canvas>
    </div>
  );
}

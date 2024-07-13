import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { button, useControls } from "leva";

export default function ModelView({ modelFileURL }) {
  const { nodes, materials } = useGLTF(`http://127.0.0.1:8000${modelFileURL}`);
  const meshes = Object.values(nodes).filter((value) => value.type === "Mesh");

  const { gl } = useThree();

  // Controllers
  const { rotationX } = useControls("Model", {
    rotationX: {
      options: [0, Math.PI / 2, Math.PI, (2 * Math.PI) / 3, 2 * Math.PI],
      value: Math.PI / 2,
    },
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

  return (
    <group dispose={null}>
      <group rotation={[rotationX, 0, 0]} position={[0, 0, 0]} scale={2}>
        {meshes.map((mesh) => (
          <mesh
            key={mesh.name}
            geometry={mesh.geometry}
            material={materials[mesh.material.name]}
          ></mesh>
        ))}
      </group>
    </group>
  );
}

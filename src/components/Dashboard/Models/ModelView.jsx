import { useGLTF } from "@react-three/drei";

export default function ModelView({ modelFileURL }) {
  const { nodes, materials } = useGLTF(`http://127.0.0.1:8000${modelFileURL}`);
  const meshes = Object.values(nodes).filter((value) => value.type === "Mesh");

  return (
    <group dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={2}>
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

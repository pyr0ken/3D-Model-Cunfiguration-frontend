import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { button, useControls } from "leva";
import { getPointCloud, clearPC, segmentPC } from "../../services/modelsApi";

const GLBModel = () => {
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/models/Heart.glb', (gltf) => {
      modelRef.current = gltf.scene;
      scene.add(modelRef.current);
    });
  }, []);

  return null;
};

const PointCloud = () => {
  const pointsRef = useRef();

  const originalColors = useRef();

  const { raycaster, gl: renderer, camera } = useThree();
  raycaster.params.Points.threshold = 0.03;

  let prompts = [];
  let labels = [];

  const { showPoints, pointSize } = useControls("Segmentation", {
    showPoints: true,
    pointSize: {
      min: 0.01,
      max: 0.2,
      value: 0.1,
    },
    Clear: button(() => {
      async () => {
        await clearPC();
      };
    }),
  });

  useEffect(() => {
    const loadPointCloud = async () => {
      const payload = { model_name: "heart.ply" };
      const data = await getPointCloud(payload);

      const positions = new Float32Array(data.xyz);
      const colors = new Float32Array(data.rgb);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3),
      );

      pointsRef.current.geometry = geometry;
      originalColors.current =
        pointsRef.current.geometry.attributes.color.clone();
    };

    loadPointCloud();
  }, []);

  useEffect(() => {
    // Ensure the PLY points visibility is updated when showPoints changes
    if (pointsRef.current) {
      pointsRef.current.visible = showPoints;
    }
  }, [showPoints]);

  async function reset() {
    let colors = pointsRef.current.geometry.attributes.color;
    for (var i = 0; i < originalColors.current.count; i++) {
      colors.setXYZ(
        i,
        originalColors.current.getX(i),
        originalColors.current.getY(i),
        originalColors.current.getZ(i),
      );
    }
    colors.needsUpdate = true;
    prompts = [];
    labels = [];
    clearPC();
  }

  const handleClick = async (event) => {
    event.stopPropagation();

    let positiveFlag;

    // Determine which button was clicked
    if (event.button === 0) {
      positiveFlag = true; // Left click
    } else if (event.button === 2) {
      positiveFlag = false; // Right click
    }

    var rect = renderer.domElement.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width;
    var y = (event.clientY - rect.top) / rect.height;

    var mouse = new THREE.Vector2(x * 2 - 1, -(y * 2) + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(pointsRef.current);

    // Send the annotation to the server
    prompts.push(intersects[0].index);
    labels.push(positiveFlag);

    console.log("Clicked: ", positiveFlag, intersects[0].point.toArray());

    const payload = {
      prompt_point: `${intersects[0].point.toArray()}`,
      prompt_label: positiveFlag,
    };

    const data = await segmentPC(payload);
    let mask = data.seg;

    // Alpha blend the mask with the point cloud
    const alpha = 0.4;
    const mask_color = [0, 0, 1];
    let colors = pointsRef.current.geometry.attributes.color;
    for (let i = 0; i < mask.length; i++) {
      let origin = [
        structuredClone(originalColors.current.getX(i)),
        structuredClone(originalColors.current.getY(i)),
        structuredClone(originalColors.current.getZ(i)),
      ];
      if (mask[i] > 0) {
        let new_color = [0, 0, 0];
        new_color[0] = origin[0] * (1 - alpha) + mask_color[0] * alpha;
        new_color[1] = origin[1] * (1 - alpha) + mask_color[1] * alpha;
        new_color[2] = origin[2] * (1 - alpha) + mask_color[2] * alpha;
        colors.setXYZ(i, new_color[0], new_color[1], new_color[2]);
      } else {
        colors.setXYZ(i, origin[0], origin[1], origin[2]);
      }
    }
    colors.needsUpdate = true;

    // Show prompt points
    for (let i = 0; i < prompts.length; i++) {
      if (labels[i] > 0) {
        colors.setXYZ(prompts[i], 1, 0, 0);
      } else {
        colors.setXYZ(prompts[i], 0, 1, 0);
      }
    }
    colors.needsUpdate = true;
  };

  return (
    <>
      <group onClick={(e) => handleClick(e)} onContextMenu={(e) => handleClick(e)}>
        <points ref={pointsRef}>
          <pointsMaterial attach="material" size={pointSize} vertexColors={true} />
        </points>
      </group>
    </>
  );
};

function App() {
  return (
    <div className="bg-grid h-[100vh] w-[100vw]">
      <Canvas camera={{ fov: 30 }}>
        <ambientLight intensity={4} />
        <directionalLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableDamping dampingFactor={0.25} enableZoom />

        <PointCloud />

        {/* <Scene showPoints={showPoints} /> */}
      </Canvas>
    </div>
  );
}

export default App;

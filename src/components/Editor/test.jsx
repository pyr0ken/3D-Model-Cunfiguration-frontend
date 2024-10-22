function Scene({ showPoints }) {
    const glbRef = useRef();
    const plyPointsRef = useRef();
    const { raycaster, camera, gl, scene } = useThree();
  
    // Initialize plyPositions as a useRef with an empty array
    const plyPositions = useRef([]);
  
    useEffect(() => {
      // Load PLY points
      const loader = new PLYLoader();
      loader.load("/models/heart.ply", (geometry) => {
        const positions = [];
        const colors = [];
  
        const positionAttribute = geometry.getAttribute("position");
  
        for (let i = 0; i < positionAttribute.count; i++) {
          const position = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            i,
          );
          positions.push([position.x, position.y, position.z]);
  
          if (geometry.hasAttribute("color")) {
            const colorAttribute = geometry.getAttribute("color");
            const color = new THREE.Color().fromBufferAttribute(
              colorAttribute,
              i,
            );
            colors.push([color.r, color.g, color.b]);
          }
        }
  
        // Assign positions to plyPositions.current after loading
        plyPositions.current = positions;
  
        // Create the PLY points object and add it to the scene
        const plyGeometry = new THREE.BufferGeometry().setFromPoints(
          positions.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        );
        const plyMaterial = new THREE.PointsMaterial({
          size: 0.01,
          vertexColors: true,
        });
  
        plyPointsRef.current = new THREE.Points(plyGeometry, plyMaterial);
        scene.add(plyPointsRef.current);
  
        // Set initial visibility of the PLY points based on showPoints prop
        plyPointsRef.current.visible = showPoints;
      });
    }, [scene, showPoints]);
  
    useEffect(() => {
      // Load GLB model
      const glbLoader = new GLTFLoader();
      glbLoader.load("/models/Heart.gltf", (gltf) => {
        glbRef.current.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
      });
    }, []);
  
    useEffect(() => {
      // Ensure the PLY points visibility is updated when showPoints changes
      if (plyPointsRef.current) {
        plyPointsRef.current.visible = showPoints;
      }
    }, [showPoints]);
  
    const handleClick = (event) => {
      event.stopPropagation();
  
      // Ensure plyPositions is loaded
      if (!plyPositions.current || plyPositions.current.length === 0) {
        console.log("PLY positions not loaded yet.");
        return;
      }
  
      // Calculate normalized mouse coordinates (-1 to +1 range)
      const mouse = new THREE.Vector2(
        (event.clientX / gl.domElement.clientWidth) * 2 - 1,
        -(event.clientY / gl.domElement.clientHeight) * 2 + 1,
      );
  
      // Set up the raycaster to intersect with the GLB model
      raycaster.setFromCamera(mouse, camera);
  
      // Check for intersections with the GLB model
      const intersects = raycaster.intersectObject(glbRef.current, true);
  
      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
  
        // Find the nearest PLY point
        let nearestPoint = null;
        let minDistance = Infinity;
  
        // Iterate over the plyPositions array
        plyPositions.current.forEach((position) => {
          const plyPoint = new THREE.Vector3(...position);
          const distance = intersectionPoint.distanceTo(plyPoint);
  
          if (distance < minDistance) {
            minDistance = distance;
            nearestPoint = plyPoint;
          }
        });
  
        // Log nearest PLY point's coordinates (x, y, z)
        if (nearestPoint) {
          console.log(
            `Nearest PLY point coordinates (x, y, z):`,
            nearestPoint.x,
            nearestPoint.y,
            nearestPoint.z,
          );
        }
      } else {
        console.log("No intersection detected");
      }
    };
  
    return (
      <group onClick={handleClick}>
        <group ref={glbRef} visible={!showPoints} />
        {/* PLY points will be automatically visible based on showPoints */}
      </group>
    );
  }

function App() {
return (
    <div className="bg-grid h-[100vh] w-[100vw]">
    <Canvas camera={{ fov: 30 }}>
        <ambientLight intensity={4} />
        <directionalLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableDamping dampingFactor={0.25} enableZoom />
        <Scene showPoints={showPoints} />
    </Canvas>
    </div>
);
}

export default App;
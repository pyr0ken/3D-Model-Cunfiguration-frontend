import "../assets/Home.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Typography from "@mui/material/Typography";
import Cube from "./Cube";
import MouseTracker from "./Models/MouseTracker";
import Navbar from "./Core/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="Home">
        <Canvas>
          <OrbitControls enablePan={false} />

          {/* <ambientLight /> */}
          <pointLight position={[0, 10, -5]} intensity={100} color="#fff" />
          <pointLight position={[0, 10, 5]} intensity={100} color="#fff" />
          <pointLight position={[0, -10, 5]} intensity={100} color="#fff" />
          <pointLight position={[10, -10, 5]} intensity={100} color="#fff" />
          <pointLight position={[-10, -10, 5]} intensity={100} color="#fff" />

          <Cube />
          <Html className="Text" center>
            <Typography
              variant="h1"
              noWrap
              component="a"
              sx={{
                fontWeight: 100,
                color: "#fff",
                fontFamily: "monospace",
                letterSpacing: "3rem",
              }}
            >
              WELCOME
            </Typography>
          </Html>
        </Canvas>
      </div>
    </>
  );
}

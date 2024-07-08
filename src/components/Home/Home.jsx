import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "../Cube";
import { showAlert } from "../Core/utils";
import Navbar from "../Core/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.successMessage) {
      showAlert("success", state.successMessage);
      // Clear the successMessage from the location state
      navigate(pathname, { replace: true });
    }
  }, [state, navigate, pathname]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="relative flex flex-col justify-center">
        <div className="h-screen w-full">
          <Canvas>
            <OrbitControls enablePan={false} />

            {/* <ambientLight /> */}
            <pointLight
              position={[0, 10, -5]}
              intensity={100}
              color="rgb(234,179,8)"
            />
            <pointLight
              position={[0, 10, 5]}
              intensity={100}
              color="rgb(239,68,68)"
            />
            <pointLight
              position={[0, -10, 5]}
              intensity={100}
              color="rgb(59,130,246)"
            />
            <pointLight
              position={[10, -10, 5]}
              intensity={100}
              color="rgb(34,197,94)"
            />
            <pointLight
              position={[-10, -10, 5]}
              intensity={100}
              color="rgb(63,60,187)"
            />

            <Cube />
          </Canvas>
        </div>

        <div className="absolute select-none left-1/2 top-1/2 flex w-full max-w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center px-10 font-mono text-[4rem] text-white/95">
          <h1>Welcome To 3D LAB</h1>
        </div>
      </div>
    </>
  );
}

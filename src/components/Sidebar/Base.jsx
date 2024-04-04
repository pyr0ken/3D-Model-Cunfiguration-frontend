import { Suspense } from "react";
import Navigation from "./Navigation";
import Model from "../Models/Model";

const Base = () => {
  return (
    <main className="w-full h-screen flex flex-row relative">
      <span className="absolute z-30 text-gray-200 text-sm left-[45%] top-1">
        Room ID: 1234-567-2344
      </span>
      <Navigation />
      <Model className="flex-1 w-full bg-leva-1/50 bg-[linear-gradient(to_right,#8c8c8c20_1px,transparent_1px),linear-gradient(to_bottom,#8c8c8c20_1px,transparent_1px)] bg-[size:30px_30px]" />
    </main>
  );
};

export default Base;

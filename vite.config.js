import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    root: "src/",
    publicDir: "../public/",
    base: "./",
    server: {
      host: "127.0.0.1",
      port: 3000,
    },
    define: {
      "process.env": env
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
      },
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});

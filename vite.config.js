import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // console.log(env);

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
        // Enable esbuild polyfill plugins
        // plugins: [
        //   NodeGlobalsPolyfillPlugin({
        //     buffer: true,
        //     process: true,
        //   }),
        //   NodeModulesPolyfillPlugin(),
        // ],
      },
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      sourcemap: true,
      // rollupOptions: {
      //   // Enable rollup polyfills plugin
      //   // used during production bundling
      //   plugins: [nodePolyfills()],
      // },
    },
  };
});

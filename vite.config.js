import react from "@vitejs/plugin-react";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  plugins: [react()],
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 3000,
    // open: !isCodeSandbox // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
};

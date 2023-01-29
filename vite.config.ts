import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  build: {
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
  plugins: [svgr(), react()],
});

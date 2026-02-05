import { config } from "dotenv";
config({ path: ".env.local" });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { apiPlugin } from "./server/api";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "halley-peritectic-unpreclusively.ngrok-free.dev"
    ]
  },
  plugins: [react(), apiPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

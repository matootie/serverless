import { join } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import paths from "vite-tsconfig-paths"

export default defineConfig({
  root: join(__dirname, "./src"),
  envDir: ".",
  envPrefix: "CLIENT_",
  publicDir: "public",
  clearScreen: false,
  logLevel: "info",
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: join(__dirname, "./dist"),
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
  },
  plugins: [react(), paths({ root: "../" })],
})

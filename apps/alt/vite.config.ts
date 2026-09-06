import { readdirSync } from "node:fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// One HTML entry per style — Vite only compiles the one you open, so both
// sides of the comparison run off a single dev server.
const entries = Object.fromEntries(
  readdirSync(__dirname)
    .filter((file) => file.endsWith(".html"))
    .map((file) => [path.basename(file, ".html"), path.resolve(__dirname, file)])
)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5293, strictPort: true },
  build: { rollupOptions: { input: entries } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

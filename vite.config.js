import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Prevent bundling of CDN imports
      external: [/^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*/],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".wasm")) {
            return "[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  // Apply the same external rule to worker builds
  worker: {
    format: "es",
    rollupOptions: {
      external: [/^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*/],
    },
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    host: true,
  },
  preview: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  optimizeDeps: {
    exclude: ["@r-wasm/webr", "webr", "pyodide"],
  },
});

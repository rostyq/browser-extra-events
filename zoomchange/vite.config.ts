import { defineConfig } from 'vite'

export default defineConfig({ 
  build: {
    lib: {
      entry: "./lib/zoomchange.ts",
      formats: [ 'es', 'iife' ],
      name: "zoomchange",
      fileName: format => {
        switch (format) {
          case "iife": return "zoomchange.min.js";
          case "es": return "zoomchange.js";
        }
      }
    }
  }
})
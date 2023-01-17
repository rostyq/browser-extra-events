import { defineConfig } from 'vite'

export default defineConfig({ 
  build: {
    lib: {
      entry: "./lib/fullscreenchange.ts",
      formats: [ 'es', 'iife' ],
      name: "fullscreenchange",
      fileName: format => {
        switch (format) {
          case "iife": return "fullscreenchange.min.js";
          case "es": return "fullscreenchange.js";
        }
      }
    }
  }
})
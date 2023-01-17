import { defineConfig } from 'vite'

export default defineConfig({ 
  build: {
    lib: {
      entry: "./lib/windowmove.ts",
      formats: [ 'es', 'iife' ],
      name: "windowmove",
      fileName: format => {
        switch (format) {
          case "iife": return "windowmove.min.js";
          case "es": return "windowmove.js";
        }
      }
    }
  }
})
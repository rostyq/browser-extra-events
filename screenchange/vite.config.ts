import { defineConfig } from 'vite'

export default defineConfig({ 
  build: {
    lib: {
      entry: "./lib/screenchange.ts",
      formats: [ 'es', 'iife' ],
      name: "screenchange",
      fileName: format => {
        switch (format) {
          case "iife": return "screenchange.min.js";
          case "es": return "screenchange.js";
        }
      }
    }
  }
})
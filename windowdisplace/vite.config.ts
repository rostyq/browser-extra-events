import { defineConfig } from 'vite'

export default defineConfig({ 
  build: {
    lib: {
      entry: "./lib/windowdisplace.ts",
      formats: [ 'es', 'iife' ],
      name: "windowdisplace",
      fileName: format => {
        switch (format) {
          case "iife": return "windowdisplace.min.js";
          case "es": return "windowdisplace.js";
        }
      }
    },
    rollupOptions: {
      external: [ "@browser-extra-events/zoomchange" ]
    }
  }
})
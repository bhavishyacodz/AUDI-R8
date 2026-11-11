import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return undefined;

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'framework';
          }

          if (id.includes('/node_modules/three/')) {
            return 'three-core';
          }

          if (id.includes('/node_modules/@react-three/')) {
            return 'react-three';
          }

          if (id.includes('/node_modules/gsap/')) {
            return 'animation';
          }

          if (id.includes('/node_modules/lucide-react/')) {
            return 'icons';
          }

          return undefined;
        },
      },
    },
  },
});

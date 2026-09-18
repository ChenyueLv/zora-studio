import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@rive-app')) return 'rive';
          if (id.includes('/three/')) return 'three';
          if (id.includes('/gsap/')) return 'motion';
          if (/node_modules\/(react|react-dom|react-router|scheduler)/.test(id)) return 'react';
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import { legacyCssFallbacks } from './scripts/legacy-css-fallbacks';
export default defineConfig({
  css: {
    postcss: {
      // VITE_LEGACY_CSS=only renders the fallbacks alone, as an old engine would.
      plugins: [legacyCssFallbacks({ only: process.env.VITE_LEGACY_CSS === 'only' })],
    },
  },
  server: {
    // 小Z 数字人的语音服务只在线上跑，本地开发直接代理过去。
    proxy: {
      '/api/avatar': {
        target: 'https://zoratv.cn',
        changeOrigin: true,
        ws: true,
        // 服务端只放行本站来源；任意本地端口都按线上来源转发。
        configure: (proxy) =>
          proxy.on('proxyReqWs', (request) => request.setHeader('origin', 'https://zoratv.cn')),
      },
    },
  },
  build: {
    // Android vendor browsers trail Chrome by years; Vite's default (Chrome 107) is too new.
    target: ['chrome87', 'edge88', 'firefox78', 'safari14'],
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

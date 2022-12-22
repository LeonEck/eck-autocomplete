import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    modulePreload: {
      polyfill: false,
    },
    assetsInlineLimit: 0,
    outDir: 'www',
    target: 'esnext',
    sourcemap: true,
  },
  esbuild: {
    mangleProps: /^_/,
  },
});

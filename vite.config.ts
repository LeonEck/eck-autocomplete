import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    assetsInlineLimit: 0,
    outDir: 'www',
    target: 'esnext',
    sourcemap: true,
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    assetsInlineLimit: 0,
  },
});

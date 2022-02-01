/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    environment: 'happy-dom',
  },
});

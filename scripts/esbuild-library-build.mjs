import esbuild from 'esbuild';
import { rmSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { esbuildLibraryConfig } from './esbuild-library-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

rmSync(esbuildLibraryConfig.outdir, { recursive: true, force: true });

esbuild.build(esbuildLibraryConfig).then(() => {
  /**
   * Run a second build for minified output.
   */
  esbuildLibraryConfig.minify = true;
  esbuildLibraryConfig.outdir = resolve(__dirname, '../dist/min');
  esbuild.build(esbuildLibraryConfig).then(() => {});
});

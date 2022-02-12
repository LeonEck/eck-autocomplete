import esbuild from 'esbuild';
import { rmSync, cpSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  esbuildProdLibraryCSSMinifyConfig,
  esbuildProductionLibraryConfig,
  libraryDirectory,
  prodBuildArtifactsDirectory,
} from './esbuild-library-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Build process:
 * The build copies everything into a temporary folder to perform
 * intermediate optimizations without having to touch the original files.
 */

/**
 * Remove all folders related to the build.
 */
rmSync(prodBuildArtifactsDirectory, { recursive: true, force: true });
rmSync(esbuildProductionLibraryConfig.outdir, { recursive: true, force: true });

/**
 * Copy library into temporary build folder.
 */
cpSync(libraryDirectory, prodBuildArtifactsDirectory, {
  recursive: true,
  force: true,
});

/**
 * Minify CSS
 */
esbuild.build(esbuildProdLibraryCSSMinifyConfig).then(() => {
  /**
   * Build bundle
   */
  esbuild.build(esbuildProductionLibraryConfig).then(() => {
    /**
     * Run a second build for minified output.
     */
    esbuildProductionLibraryConfig.minify = true;
    esbuildProductionLibraryConfig.outdir = resolve(__dirname, '../dist/min');
    esbuild.build(esbuildProductionLibraryConfig).then(() => {});
  });
});

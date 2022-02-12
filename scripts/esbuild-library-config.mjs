import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Folder where the library is located.
 */
export const libraryDirectory = resolve(__dirname, '../eck-autocomplete');

/**
 * Temporary folder that is used in production builds.
 */
export const prodBuildArtifactsDirectory = resolve(
  __dirname,
  '../build-artifacts'
);

/**
 * Esbuild config for watch mode.
 */
export const esbuildWatchLibraryConfig = {
  entryPoints: [
    resolve(libraryDirectory, 'eck-autocomplete.ts'),
    resolve(
      libraryDirectory,
      'eck-autocomplete-component/eck-autocomplete-component.ts'
    ),
    resolve(
      libraryDirectory,
      'eck-autocomplete-option-component/eck-autocomplete-option-component.ts'
    ),
  ],
  bundle: true,
  loader: {
    '.html': 'text',
    '.css': 'text',
  },
  outdir: resolve(__dirname, '../dist'),
  format: 'esm',
  sourcemap: true,
  watch: true,
};

/**
 * Esbuild config to minify CSS for production builds.
 */
export const esbuildProdLibraryCSSMinifyConfig = {
  entryPoints: [
    resolve(
      prodBuildArtifactsDirectory,
      'eck-autocomplete-component/eck-autocomplete-component.css'
    ),
    resolve(
      prodBuildArtifactsDirectory,
      'eck-autocomplete-option-component/eck-autocomplete-option-component.css'
    ),
  ],
  bundle: true,
  minify: true,
  outdir: prodBuildArtifactsDirectory,
  allowOverwrite: true,
};

/**
 * Esbuild config for production build.
 */
export const esbuildProductionLibraryConfig = {
  entryPoints: [
    resolve(prodBuildArtifactsDirectory, 'eck-autocomplete.ts'),
    resolve(
      prodBuildArtifactsDirectory,
      'eck-autocomplete-component/eck-autocomplete-component.ts'
    ),
    resolve(
      prodBuildArtifactsDirectory,
      'eck-autocomplete-option-component/eck-autocomplete-option-component.ts'
    ),
  ],
  bundle: true,
  loader: {
    '.html': 'text',
    '.css': 'text',
  },
  outdir: resolve(__dirname, '../dist'),
  format: 'esm',
  sourcemap: true,
};

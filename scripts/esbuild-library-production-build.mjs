import esbuild from 'esbuild';
import { rmSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'html-minifier';
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
 * Minify HTML
 */
const eckAutocompleteComponentHTMLFile = resolve(
  prodBuildArtifactsDirectory,
  'eck-autocomplete-component/eck-autocomplete-component.html'
);
const eckAutocompleteOptionComponentHTMLFile = resolve(
  prodBuildArtifactsDirectory,
  'eck-autocomplete-option-component/eck-autocomplete-option-component.html'
);

const eckAutocompleteComponentHTML = readFileSync(
  eckAutocompleteComponentHTMLFile,
  { encoding: 'utf8' }
);
const eckAutocompleteOptionComponentHTML = readFileSync(
  eckAutocompleteOptionComponentHTMLFile,
  { encoding: 'utf8' }
);

const minifyHTMLConfig = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};
const eckAutocompleteComponentHTMLMinified = minify(
  eckAutocompleteComponentHTML,
  minifyHTMLConfig
);
const eckAutocompleteOptionComponentHTMLMinified = minify(
  eckAutocompleteOptionComponentHTML,
  minifyHTMLConfig
);

writeFileSync(
  eckAutocompleteComponentHTMLFile,
  eckAutocompleteComponentHTMLMinified
);
writeFileSync(
  eckAutocompleteOptionComponentHTMLFile,
  eckAutocompleteOptionComponentHTMLMinified
);

/**
 * Minify CSS
 */
esbuild.build(esbuildProdLibraryCSSMinifyConfig).then(() => {
  /**
   * Remove trailing new line from CSS files.
   * This is a micro optimization to prevent the newline from showing up in the final output.
   */
  const eckAutocompleteComponentCSSFile = resolve(
    prodBuildArtifactsDirectory,
    'eck-autocomplete-component/eck-autocomplete-component.css'
  );
  const eckAutocompleteOptionComponentCSSFile = resolve(
    prodBuildArtifactsDirectory,
    'eck-autocomplete-option-component/eck-autocomplete-option-component.css'
  );

  const eckAutocompleteComponentCSS = readFileSync(
    eckAutocompleteComponentCSSFile,
    { encoding: 'utf8' }
  );
  const eckAutocompleteOptionComponentCSS = readFileSync(
    eckAutocompleteOptionComponentCSSFile,
    { encoding: 'utf8' }
  );

  const eckAutocompleteComponentCSSTrimmed = eckAutocompleteComponentCSS.trim();
  const eckAutocompleteOptionComponentCSSTrimmed =
    eckAutocompleteOptionComponentCSS.trim();

  writeFileSync(
    eckAutocompleteComponentCSSFile,
    eckAutocompleteComponentCSSTrimmed
  );
  writeFileSync(
    eckAutocompleteOptionComponentCSSFile,
    eckAutocompleteOptionComponentCSSTrimmed
  );

  /**
   * Build bundle
   */
  esbuild.build(esbuildProductionLibraryConfig).then(() => {
    /**
     * Run a second build for minified output.
     */
    esbuildProductionLibraryConfig.minify = true;
    esbuildProductionLibraryConfig.mangleProps = /^_/;
    esbuildProductionLibraryConfig.outdir = resolve(__dirname, '../dist/min');
    esbuild.build(esbuildProductionLibraryConfig).then(() => {});
  });
});

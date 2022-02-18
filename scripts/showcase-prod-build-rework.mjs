/**
 * I am not pleased with some decisions that vite took while building.
 * This script reworks the production build.
 */

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  renameSync,
} from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const wwwFolder = resolve(__dirname, '../www');
const assetsFolder = resolve(wwwFolder, 'assets');
const indexHtmlFile = resolve(wwwFolder, 'index.html');

/**
 * Inline CSS back into the head (where it came from).
 * Hopefully this can be removed in the future when vite adds support
 * for CSS inlining: https://github.com/vitejs/vite/issues/6737
 */
const inlineCSS = () => {
  const cssFileName = readdirSync(assetsFolder).filter(
    (file) => file.startsWith('index.') && file.endsWith('.css')
  )[0];

  const cssFile = resolve(assetsFolder, cssFileName);

  const cssContent = readFileSync(cssFile).toString();

  let indexHtmlContent = readFileSync(indexHtmlFile).toString();

  const stringToReplace = `<link rel="stylesheet" href="/assets/${cssFileName}">`;
  const inlineCSS = `<style>${cssContent.trim()}</style>`;

  indexHtmlContent = indexHtmlContent.replace(stringToReplace, inlineCSS);

  writeFileSync(indexHtmlFile, indexHtmlContent);

  rmSync(cssFile, { force: true });
};

/**
 * Move favicon to root, remove hash, and update reference in index.html
 */
const fixFavicon = () => {
  const faviconFileName = readdirSync(assetsFolder).filter(
    (file) => file.startsWith('favicon.') && file.endsWith('.ico')
  )[0];
  const faviconFile = resolve(assetsFolder, faviconFileName);

  const newFaviconDestination = resolve(wwwFolder, 'favicon.ico');

  renameSync(faviconFile, newFaviconDestination);

  let indexHtmlContent = readFileSync(indexHtmlFile).toString();

  const stringToReplace = `<link rel="icon" type="image/x-icon" href="/assets/${faviconFileName}" />`;
  const newFaviconReference = `<link rel="icon" type="image/x-icon" href="/favicon.ico" />`;

  indexHtmlContent = indexHtmlContent.replace(
    stringToReplace,
    newFaviconReference
  );

  writeFileSync(indexHtmlFile, indexHtmlContent);
};

inlineCSS();
fixFavicon();

import { cpSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const e2eFolder = resolve(__dirname, '../e2e');
const wwwFolder = resolve(__dirname, '../www');
const minFile = resolve(__dirname, '../dist/min/eck-autocomplete.js');

/**
 * Copy E2E html files
 */
cpSync(e2eFolder, resolve(wwwFolder, 'e2e'), {
  recursive: true,
  force: true,
  filter: (file) => file.endsWith('.html') || !file.includes('.'),
});

/**
 * Copy eck-autocomplete so that the E2E sites can import it
 */
cpSync(minFile, resolve(wwwFolder, 'dist/eck-autocomplete.js'), {
  recursive: true,
  force: true,
});

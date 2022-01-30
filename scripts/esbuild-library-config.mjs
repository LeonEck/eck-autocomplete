import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const esbuildLibraryConfig = {
  entryPoints: [
    resolve(__dirname, '../eck-autocomplete/eck-autocomplete.ts'),
    resolve(
      __dirname,
      '../eck-autocomplete/eck-autocomplete-component/eck-autocomplete-component.ts'
    ),
    resolve(
      __dirname,
      '../eck-autocomplete/eck-autocomplete-option-component/eck-autocomplete-option-component.ts'
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

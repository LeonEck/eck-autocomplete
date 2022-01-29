import esbuild from 'esbuild';

esbuild.build({
  entryPoints: [
    './eck-autocomplete/eck-autocomplete.ts',
    './eck-autocomplete/eck-autocomplete-component/eck-autocomplete-component.ts',
    './eck-autocomplete/eck-autocomplete-option-component/eck-autocomplete-option-component.ts',
  ],
  bundle: true,
  loader: {
    '.html': 'text',
    '.css': 'text',
  },
  outdir: './dist/',
  format: 'esm',
  sourcemap: true,
  watch: true,
});

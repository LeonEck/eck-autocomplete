import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./eck-autocomplete/public_api.ts'],
  bundle: true,
  loader: {
    '.html': 'text',
  },
  outfile: './dist/eck-autocomplete.js',
  watch: true,
});

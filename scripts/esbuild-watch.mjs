import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ['./eck-autocomplete/public_api.js'],
    bundle: true,
    loader: {
      ".html": "text"
    },
    outfile: './dist/eck-autocomplete.js',
    watch: true,
  });

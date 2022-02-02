import esbuild from 'esbuild';
import { rmSync } from 'fs';
import { esbuildLibraryConfig } from './esbuild-library-config.mjs';

rmSync(esbuildLibraryConfig.outdir, { recursive: true, force: true });

esbuild.build(esbuildLibraryConfig).then(() => {});

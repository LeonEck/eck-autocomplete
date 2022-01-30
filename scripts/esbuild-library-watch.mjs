import esbuild from 'esbuild';
import { esbuildLibraryConfig } from './esbuild-library-config.mjs';

esbuildLibraryConfig.watch = true;

esbuild.build(esbuildLibraryConfig).then(() => {});

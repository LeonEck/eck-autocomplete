import esbuild from 'esbuild';
import { esbuildLibraryConfig } from './esbuild-library-config.mjs';

esbuild.build(esbuildLibraryConfig).then(() => {});

import esbuild from 'esbuild';
import { esbuildWatchLibraryConfig } from './esbuild-library-config.mjs';

esbuild.build(esbuildWatchLibraryConfig).then(() => {});

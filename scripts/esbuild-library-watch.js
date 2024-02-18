import esbuild from 'esbuild';
import { esbuildWatchLibraryConfig } from './esbuild-library-config.js';

const ctx = await esbuild.context(esbuildWatchLibraryConfig);
await ctx.watch();

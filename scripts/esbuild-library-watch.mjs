import esbuild from 'esbuild';
import { esbuildWatchLibraryConfig } from './esbuild-library-config.mjs';

const ctx = await esbuild.context(esbuildWatchLibraryConfig);
await ctx.watch();

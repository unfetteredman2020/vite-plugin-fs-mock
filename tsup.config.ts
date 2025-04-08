import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: './src/main.ts'
  },
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'node16',
  external: ['vite', 'path', 'fs', 'os', 'events', 'stream', 'buffer'],
  minify:  true,
  treeshake: true,
  outDir: 'dist',
  keepNames: false,
  splitting: true
})
import { defineConfig } from 'vite'
import { viteMockPlugin } from './src/main.ts'
import path from 'path'
import { MockFileExtEnum } from './types'
import { nodePolyfills } from 'vite-plugin-node-polyfills';


export default defineConfig({
  // clearScreen: false,
  plugins: [
    // viteMockPlugin({ path: path.join(__dirname, './mock'), ext: MockFileExtEnum.TS })
    nodePolyfills({
      // 按需选择要 polyfill 的模块
      include: ['path', 'stream', 'os', 'util', 'events'],
      globals: { Buffer: true },
    }),
  ],
  server: {
    port: 5500
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: './src/main.ts',
    }
    // lib: {
    //   entry: './src/main.ts',
    //   fileName: 'vite-plugin-mock',
    //   name: 'vite-plugin-mock',
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './types')
    }
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    exclude: ['fsevents']
  }
})

import { defineConfig } from 'vite'
import { viteMockPlugin } from './src/main.ts';
import path from 'path';

export default defineConfig({
  // clearScreen: false,
  plugins: [
    viteMockPlugin({path: path.join(__dirname, './mock')})
  ],
  build: {
    lib: {
      entry: './src/main.ts',
      fileName: 'vite-mock-server'
    }
  }
})

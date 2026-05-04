import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: './src/main.jsx',
      name: 'SearchFilter',
      fileName: 'search-filter',
      formats: ['iife'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});

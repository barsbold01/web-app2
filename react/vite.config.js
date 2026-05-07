import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const reactDependency = (path) =>
  fileURLToPath(new URL(`./node_modules/${path}`, import.meta.url));

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? '..' : '.',
  plugins: command === 'serve' ? [] : [react()],
  resolve: {
    alias: [
      { find: /^react$/, replacement: reactDependency('react/index.js') },
      { find: /^react-dom$/, replacement: reactDependency('react-dom/index.js') },
      { find: /^react-dom\/client$/, replacement: reactDependency('react-dom/client.js') },
      { find: /^react\/jsx-runtime$/, replacement: reactDependency('react/jsx-runtime.js') },
      { find: /^react\/jsx-dev-runtime$/, replacement: reactDependency('react/jsx-dev-runtime.js') },
    ],
  },
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
}));

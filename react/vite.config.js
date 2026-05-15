import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const reactCacheDir = fileURLToPath(new URL('./node_modules/.vite', import.meta.url));

const reactDependency = (path) =>
  fileURLToPath(new URL(`./node_modules/${path}`, import.meta.url));

const reactDevPages = () => ({
  name: 'react-dev-pages',
  apply: 'serve',
  transformIndexHtml(html, context) {
    if (context.path === '/' || context.path === '/index.html') {
      return `<!DOCTYPE html>
<html lang="mn">
<head>
  <script type="module">
    import RefreshRuntime from "/@react-refresh";
    RefreshRuntime.injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  </script>
  <script type="module" src="/@vite/client"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Хяналтын самбар — Дараагийн Алхам</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="/css/uni.css" />
  <link rel="stylesheet" href="/css/scholar.css" />
  <link rel="stylesheet" href="/css/exam.css" />
  <link rel="stylesheet" href="/css/dashboard.css" />
</head>
<body>
  <div id="root"></div>
  <script src="/js/favorites.js"></script>
  <script src="/js/data.js"></script>
  <script type="module" src="/react/src/main.jsx"></script>
</body>
</html>`;
    }

    return html.replace(
      '<script src="../react/dist/search-filter.iife.js"></script>',
      '<script type="module" src="/react/src/main.jsx"></script>',
    );
  },
});

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? '..' : '.',
  cacheDir: reactCacheDir,
  plugins: command === 'serve' ? [reactDevPages(), react()] : [react()],
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
    'process.env.NODE_ENV': JSON.stringify(command === 'serve' ? 'development' : 'production'),
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const reactCacheDir = fileURLToPath(new URL('./node_modules/.vite', import.meta.url));
const landingPagePath = fileURLToPath(new URL('../html/index.html', import.meta.url));

const reactDependency = (path) =>
  fileURLToPath(new URL(`./node_modules/${path}`, import.meta.url));

const landingPageHtml = () =>
  readFileSync(landingPagePath, 'utf8')
    .replaceAll('../css/', '/css/')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="dashboard.html"', 'href="/app"')
    .replaceAll('href="uni.html"', 'href="/app#universities"')
    .replaceAll('href="scholar.html"', 'href="/app#scholarships"')
    .replaceAll('href="exam-info.html"', 'href="/app#exams"')
    .replaceAll('href="auth.html"', 'href="/html/auth.html"')
    .replaceAll('href="guide.html"', 'href="/app#application"');

const reactAppHtml = (initialPage = 'dashboard') => `<!DOCTYPE html>
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
  <script>window.__INITIAL_APP_PAGE__ = ${JSON.stringify(initialPage)};</script>
  <script src="/js/favorites.js"></script>
  <script src="/js/data.js"></script>
  <script type="module" src="/react/src/main.jsx"></script>
</body>
</html>`;

const reactDevPages = () => ({
  name: 'react-dev-pages',
  apply: 'serve',
  transformIndexHtml(html, context) {
    const appPages = {
      '/html/dashboard.html': 'dashboard',
      '/html/uni.html': 'universities',
      '/html/scholar.html': 'scholarships',
      '/html/exam-info.html': 'exams',
      '/html/guide.html': 'application',
    };
    const appPage = appPages[context.originalUrl] || appPages[context.path];
    if (appPage) {
      return reactAppHtml(appPage);
    }

    if (context.originalUrl === '/app' || context.originalUrl === '/app/') {
      return reactAppHtml();
    }

    if (context.path === '/' || context.path === '/index.html') {
      return landingPageHtml();
    }

    if (context.path === '/app' || context.path === '/app/') {
      return reactAppHtml();
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

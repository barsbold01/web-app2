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
    .replaceAll('href="dashboard.html"', 'href="/html/dashboard.html"')
    .replaceAll('href="uni.html"', 'href="/html/uni.html"')
    .replaceAll('href="scholar.html"', 'href="/html/scholar.html"')
    .replaceAll('href="exam-info.html"', 'href="/html/exam-info.html"')
    .replaceAll('href="auth.html"', 'href="/html/auth.html"')
    .replaceAll('href="guide.html"', 'href="/html/guide.html"');

const reactDevPages = () => ({
  name: 'react-dev-pages',
  apply: 'serve',
  transformIndexHtml(html, context) {
    if (context.path === '/' || context.path === '/index.html') {
      return landingPageHtml();
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

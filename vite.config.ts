import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  // 按需引入vant
  plugins: [vue(), vueJsx(), styleImport({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      },
    ],
  })],
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@import "src/assets/common.scss";',
    //   },
    // },
  },
  // 起别名
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'src', replacement: '/src' },
      { find: 'views', replacement: '/src/views' },
      { find: 'components', replacement: '/src/components' },
      { find: 'utils', replacement: '/src/utils' },
      { find: 'api', replacement: '/src/api' },
      { find: 'store', replacement: '/src/store' },
      { find: 'assets', replacement: '/src/assets' },
    ],
  },
  base: '/',
  // publicDir: './public',
  server: {
    host: 'localhost',
    port: 3001,
    // middlewareMode: 'html',
    // fs: {
    //   // strict: false,
    //   allow: ['..', '.'],
    // },
    // // 是否自动在浏览器打开
    // open: true,
    // // 是否开启 https
    // https: true,
    // // 服务端渲染
    // ssr: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8097',
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (pathSrc) => pathSrc.replace('/api', ''),
    //   },
    // },
  },
  // build: {
  //   // target: 'es2015',
  //   polyfillModulePreload: true,
  //   minify: 'esbuild',
  //   assetsDir: '',
  // },
});

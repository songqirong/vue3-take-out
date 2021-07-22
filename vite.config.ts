import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  // 按需引入vant
  plugins: [vue(), styleImport({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      },
    ],
  })],
  // 起别名
  resolve: {
    alias: [
      { find: '@', replacement: 'src' },
      { find: 'views', replacement: 'src/views' },
      { find: 'components', replacement: 'src/components' },
      { find: 'utils', replacement: 'src/utils' },
      { find: 'api', replacement: 'src/api' },
      { find: 'store', replacement: 'src/store' },
    ],
  },
  base: './',
  server: {
    host: 'localhost',
    port: 3001,
    // // 是否自动在浏览器打开
    // open: true,
    // // 是否开启 https
    // https: false,
    // // 服务端渲染
    // ssr: false,
    proxy: {
      'api': {
        target: 'http://localhost:3333/',
        changeOrigin: true,
        ws: true,
        rewrite: (pathSrc) => pathSrc.replace('/api', ''),
      },
    },
  },
});

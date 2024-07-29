import vue from '@vitejs/plugin-vue';
import lodash from 'lodash';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'study-quiz-app',
  plugins: [
    vue(),
    eslintPlugin({
      fix: true,
    }),
    AutoImport({
      vueTemplate: true,
      defaultExportByFilename: true,
      imports: [
        'vue',
        'vue-router',
        {
          from: 'lodash',
          imports: lodash.keys(
            lodash.fromPairs(
              lodash.toPairs(lodash).filter(([key, value]) => typeof value == 'function'),
            ),
          ),
        },
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    components({
      dts: false,
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
  ],
  server: {
    port: 6161,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@models': path.resolve(__dirname, 'src/services/models'),
      '@api': path.resolve(__dirname, 'src/services/api'),
      '@dto': path.resolve(__dirname, 'src/services/DTO'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@style/abstracts/index.scss";
        @import '@style/vendors/bootstrap/abstracts.scss';`,
      },
    },
  },
});

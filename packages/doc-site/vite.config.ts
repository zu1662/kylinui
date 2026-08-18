import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const basePath = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  // GitHub Pages 的项目站点位于仓库二级目录，构建资源必须带上对应前缀。
  base: basePath.endsWith('/') ? basePath : `${basePath}/`,
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        mobile: fileURLToPath(new URL('./mobile.html', import.meta.url)),
      },
    },
  },
  resolve: {
    // 文档站直接引用组件源码，修改组件后可以获得即时热更新反馈。
    alias: {
      '@kylinui/vue': fileURLToPath(new URL('../vue-ui/src/index.ts', import.meta.url)),
      '@vue-ui': fileURLToPath(new URL('../vue-ui/src', import.meta.url)),
    },
  },
});

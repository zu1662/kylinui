import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 文档站直接引用组件源码，修改组件后可以获得即时热更新反馈。
    alias: {
      '@kylin-design/vue-ui': fileURLToPath(new URL('../vue-ui/src/index.ts', import.meta.url)),
      '@vue-ui': fileURLToPath(new URL('../vue-ui/src', import.meta.url)),
    },
  },
});

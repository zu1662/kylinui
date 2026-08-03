import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      // 以下目录和类型只服务于文档站，不属于组件库的公共发布内容。
      exclude: ['src/**/_usage/**', 'src/**/_demo/**', 'src/**/_doc/**', 'src/usage.ts'],
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'KylinDesignVue',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // UMD 构建由宿主页面提供 Vue，同时显式声明命名导出以避免消费端歧义。
        exports: 'named',
        globals: { vue: 'Vue' },
      },
    },
  },
});

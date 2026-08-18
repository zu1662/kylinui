import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'KylinDesignVue',
      formats: ['umd'],
      fileName: () => 'index.umd.cjs',
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

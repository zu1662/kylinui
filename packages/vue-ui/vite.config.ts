import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { discoverPublicEntries } from './scripts/public-entries.mjs';

const packageRoot = fileURLToPath(new URL('.', import.meta.url));
const publicEntries = await discoverPublicEntries(packageRoot);
const entries = Object.fromEntries([
  ['index', fileURLToPath(new URL('./src/index.ts', import.meta.url))],
  ...publicEntries.map((entry) => [`${entry.name}/index`, entry.source]),
]);

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
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format: string, entryName: string) =>
        format === 'es' ? `${entryName}.js` : `${entryName}.cjs`,
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
      },
    },
  },
});

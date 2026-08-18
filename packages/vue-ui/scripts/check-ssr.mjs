import { execFile } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const tempRoot = path.join(packageRoot, '.release-check', 'ssr');
const fixturePath = path.join(tempRoot, 'entry.mjs');
const outputPath = path.join(tempRoot, 'dist', 'entry.mjs');

await rm(tempRoot, { recursive: true, force: true });
await mkdir(tempRoot, { recursive: true });
await writeFile(
  fixturePath,
  `import KylinDesign, * as library from '@kylinui/vue';
if (!KylinDesign || !library.KyButton) throw new Error('SSR 环境无法加载组件库入口。');
if (library.getKylinTheme() !== 'jade') throw new Error('SSR 主题回退值异常。');
console.log('SSR artifact loaded');
`,
);

try {
  await build({
    configFile: false,
    root: packageRoot,
    logLevel: 'error',
    ssr: {
      noExternal: ['@kylinui/vue'],
    },
    build: {
      ssr: fixturePath,
      outDir: path.dirname(outputPath),
      emptyOutDir: true,
      rollupOptions: {
        external: ['vue'],
        output: {
          entryFileNames: 'entry.mjs',
        },
      },
    },
  });

  const { stdout, stderr } = await execFileAsync(process.execPath, [outputPath], {
    cwd: packageRoot,
  });
  if (!stdout.includes('SSR artifact loaded')) {
    throw new Error(`SSR 产物执行结果异常：${stdout || stderr}`);
  }
  console.log('SSR 构建与无 DOM 加载检查通过。');
} finally {
  await rm(path.join(packageRoot, '.release-check'), { recursive: true, force: true });
}

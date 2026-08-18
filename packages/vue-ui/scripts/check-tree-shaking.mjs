import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build } from 'vite';

const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const tempRoot = path.join(packageRoot, '.release-check', 'tree-shaking');

async function bundleFixture(name, importSource) {
  const fixturePath = path.join(tempRoot, `${name}.mjs`);
  await writeFile(
    fixturePath,
    `import { KyButton } from '${importSource}';\nglobalThis.__KY_BUTTON__ = KyButton;\n`,
  );

  const result = await build({
    configFile: false,
    root: packageRoot,
    logLevel: 'error',
    build: {
      write: false,
      minify: false,
      lib: {
        entry: fixturePath,
        formats: ['es'],
        fileName: () => `${name}.js`,
      },
      rollupOptions: {
        external: ['vue'],
      },
    },
  });
  const outputs = Array.isArray(result) ? result : [result];
  const chunk = outputs
    .flatMap((output) => output.output)
    .find((output) => output.type === 'chunk');
  if (!chunk || chunk.type !== 'chunk') throw new Error(`未生成 ${name} Tree Shaking 检查产物。`);
  return chunk.code;
}

await rm(tempRoot, { recursive: true, force: true });
await mkdir(tempRoot, { recursive: true });

try {
  const rootCode = await bundleFixture('root-entry', '@kylin-design/vue-ui');
  const subpathCode = await bundleFixture('button-entry', '@kylin-design/vue-ui/button');
  const forbiddenMarkers = ['KyCalendar', 'ky-calendar', 'KyImagePreview', 'ky-image-preview'];

  for (const [name, code] of [
    ['根入口', rootCode],
    ['Button 子入口', subpathCode],
  ]) {
    for (const marker of forbiddenMarkers) {
      if (code.includes(marker)) {
        throw new Error(`${name}按需构建仍包含非目标组件标记：${marker}。`);
      }
    }
  }

  const rootGzip = gzipSync(rootCode).byteLength;
  const subpathGzip = gzipSync(subpathCode).byteLength;
  if (rootGzip > subpathGzip + 2048) {
    throw new Error(
      `根入口命名导入比组件子入口多 ${rootGzip - subpathGzip} B gzip，Tree Shaking 结果异常。`,
    );
  }

  console.log(
    `Tree Shaking 检查通过：根入口 ${rootGzip} B gzip，Button 子入口 ${subpathGzip} B gzip。`,
  );
} finally {
  await rm(path.join(packageRoot, '.release-check'), { recursive: true, force: true });
}

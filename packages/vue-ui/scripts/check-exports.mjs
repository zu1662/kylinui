import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverPublicEntries } from './public-entries.mjs';

const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const packageJson = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
const entries = await discoverPublicEntries(packageRoot);
const expectedExports = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
    require: './dist/index.cjs',
    default: './dist/index.js',
  },
  './style.css': './dist/style.css',
  './base.css': './dist/base.css',
  './umd': {
    require: './dist/index.umd.cjs',
    default: './dist/index.umd.cjs',
  },
  './*': {
    types: './dist/*/index.d.ts',
    import: './dist/*/index.js',
    require: './dist/*/index.cjs',
    default: './dist/*/index.js',
  },
  './*/style.css': './dist/*/style.css',
  './package.json': './package.json',
};

if (JSON.stringify(packageJson.exports) !== JSON.stringify(expectedExports)) {
  console.error('package.json 应只保留固定的通配符公共导出规则，请勿逐项枚举组件入口。');
  process.exit(1);
}

const outputTargets = new Set([
  'dist/index.d.ts',
  'dist/index.js',
  'dist/index.cjs',
  'dist/style.css',
  'dist/base.css',
  'dist/index.umd.cjs',
]);

for (const entry of entries) {
  outputTargets.add(`dist/${entry.name}/index.d.ts`);
  outputTargets.add(`dist/${entry.name}/index.js`);
  outputTargets.add(`dist/${entry.name}/index.cjs`);
  if (entry.styleSource) outputTargets.add(`dist/${entry.name}/style.css`);
}

const missingTargets = [];
for (const target of outputTargets) {
  try {
    await access(path.join(packageRoot, target));
  } catch {
    missingTargets.push(target);
  }
}

if (missingTargets.length > 0) {
  console.error(`公共导出存在缺失产物：\n- ${missingTargets.join('\n- ')}`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
for (const entry of ['.', ...entries.map((item) => `./${item.name}`)]) {
  const specifier = entry === '.' ? packageJson.name : `${packageJson.name}${entry.slice(1)}`;
  await import(specifier);
  require(specifier);
}

console.log(`通配符公共导出与 ${entries.length} 个源码子入口及构建产物一致。`);

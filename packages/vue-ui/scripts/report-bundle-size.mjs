import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { bundleSizeBudgets } from '../bundle-size.config.mjs';

const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distRoot = path.join(packageRoot, 'dist');
const localImportPattern = /(?:from\s+|import\s*|require\()(['"])(\.[^'"]+)\1/g;

async function listBuildFiles(directory) {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      result.push(...(await listBuildFiles(itemPath)));
    } else if (/\.(?:js|cjs|css)$/.test(item.name)) {
      result.push(itemPath);
    }
  }
  return result;
}

function formatBytes(bytes) {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KiB`;
}

function measureContent(content) {
  return {
    raw: content.byteLength,
    gzip: gzipSync(content).byteLength,
    brotli: brotliCompressSync(content).byteLength,
  };
}

async function readEntryGraph(entryFile) {
  const visited = new Set();
  const contents = [];

  async function visit(filePath) {
    const resolvedPath = path.resolve(filePath);
    if (visited.has(resolvedPath)) return;
    visited.add(resolvedPath);

    const content = await readFile(resolvedPath);
    contents.push(content);
    const source = content.toString('utf8');
    for (const match of source.matchAll(localImportPattern)) {
      const dependencyPath = path.resolve(path.dirname(resolvedPath), match[2]);
      if (dependencyPath.startsWith(distRoot)) await visit(dependencyPath);
    }
  }

  await visit(path.join(distRoot, entryFile));
  return {
    files: [...visited].map((filePath) => path.relative(distRoot, filePath).replaceAll('\\', '/')),
    content: Buffer.concat(contents),
  };
}

const files = [];
for (const filePath of await listBuildFiles(distRoot)) {
  const content = await readFile(filePath);
  files.push({
    file: path.relative(distRoot, filePath).replaceAll('\\', '/'),
    ...measureContent(content),
  });
}
files.sort((left, right) => left.file.localeCompare(right.file));

const artifacts = [];
const failures = [];
for (const [file, budget] of Object.entries(bundleSizeBudgets)) {
  const filePath = path.join(distRoot, file);
  let measured;
  let memberCount = 1;

  try {
    if (budget.includeDependencies) {
      const graph = await readEntryGraph(file);
      measured = measureContent(graph.content);
      memberCount = graph.files.length;
    } else {
      measured = measureContent(await readFile(filePath));
    }
  } catch {
    failures.push(`${file} 未生成`);
    continue;
  }

  const artifact = { file, memberCount, ...measured, budgetGzip: budget.gzip };
  artifacts.push(artifact);
  if (artifact.gzip > budget.gzip) {
    failures.push(
      `${file} gzip ${formatBytes(artifact.gzip)} 超过预算 ${formatBytes(budget.gzip)}`,
    );
  }
}

const report = {
  package: '@kylinui/vue',
  budgets: bundleSizeBudgets,
  passed: failures.length === 0,
  artifacts,
  files,
};
await writeFile(
  path.join(distRoot, 'bundle-size-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.table(
  artifacts.map((item) => ({
    文件: item.file,
    依赖文件数: item.memberCount,
    原始: formatBytes(item.raw),
    gzip: formatBytes(item.gzip),
    gzip预算: formatBytes(item.budgetGzip),
    brotli: formatBytes(item.brotli),
  })),
);

if (failures.length > 0) {
  throw new Error(`Bundle size 门禁失败：\n- ${failures.join('\n- ')}`);
}
console.log(`Bundle size 报告已写入 dist/bundle-size-report.json，共统计 ${files.length} 个文件。`);

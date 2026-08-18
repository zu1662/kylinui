import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import less from 'less';
import { discoverPublicEntries } from './public-entries.mjs';

const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceRoot = path.join(packageRoot, 'src');
const distRoot = path.join(packageRoot, 'dist');
const entries = await discoverPublicEntries(packageRoot);
const styleEntries = new Map(
  entries.filter((entry) => entry.styleSource).map((entry) => [entry.name, entry]),
);
const runtimeImportPattern = /import\s+(?!type\b)[\s\S]*?\sfrom\s+['"]\.\.\/([^/'"]+)['"]/g;

async function listRuntimeSources(directory) {
  const result = [];

  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (item.name.startsWith('_') || item.name === 'style') continue;
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      result.push(...(await listRuntimeSources(itemPath)));
    } else if (/\.(?:ts|vue)$/.test(item.name)) {
      result.push(itemPath);
    }
  }

  return result;
}

async function collectStyleDependencies(entryName) {
  const dependencies = new Set();
  const componentRoot = path.join(sourceRoot, entryName);

  for (const sourceFile of await listRuntimeSources(componentRoot)) {
    const source = await readFile(sourceFile, 'utf8');
    for (const match of source.matchAll(runtimeImportPattern)) {
      const dependencyName = match[1];
      if (dependencyName !== entryName && styleEntries.has(dependencyName)) {
        dependencies.add(dependencyName);
      }
    }
  }

  return dependencies;
}

const dependencyGraph = new Map();
for (const entryName of styleEntries.keys()) {
  dependencyGraph.set(entryName, await collectStyleDependencies(entryName));
}

function resolveStyleOrder(entryName, visiting = new Set(), resolved = new Set()) {
  if (resolved.has(entryName) || visiting.has(entryName)) return [];

  visiting.add(entryName);
  const order = [];
  for (const dependencyName of dependencyGraph.get(entryName) ?? []) {
    order.push(...resolveStyleOrder(dependencyName, visiting, resolved));
  }
  visiting.delete(entryName);
  resolved.add(entryName);
  order.push(entryName);
  return order;
}

async function compileStyle(source, filename) {
  const result = await less.render(source, {
    filename,
    compress: true,
  });
  return `${result.css.trim()}\n`;
}

const baseStyleSource = path.join(sourceRoot, 'style', 'index.less');
const baseStyle = await compileStyle(await readFile(baseStyleSource, 'utf8'), baseStyleSource);
await writeFile(path.join(distRoot, 'base.css'), baseStyle);

for (const [entryName, entry] of styleEntries) {
  const styleOrder = resolveStyleOrder(entryName);
  const source = styleOrder
    .map((name) => `@import "${styleEntries.get(name).styleSource.replaceAll('\\', '/')}";`)
    .join('\n');
  const css = await compileStyle(source, entry.styleSource);
  const outputDirectory = path.join(distRoot, entryName);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'style.css'), css);
}

console.log(`已生成 base.css 与 ${styleEntries.size} 个按需样式入口。`);

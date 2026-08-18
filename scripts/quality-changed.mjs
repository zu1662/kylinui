import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = dirname(scriptDirectory);

const readNullSeparatedPaths = (args) => {
  const result = spawnSync('git', args, {
    cwd: repositoryRoot,
    encoding: 'buffer',
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.stdout.toString('utf8').split('\0').filter(Boolean);
};

const changedPaths = readNullSeparatedPaths([
  'diff',
  '--name-only',
  '--diff-filter=ACMRTUXB',
  '-z',
  'HEAD',
  '--',
]);
const untrackedPaths = readNullSeparatedPaths([
  'ls-files',
  '--others',
  '--exclude-standard',
  '-z',
  '--',
]);
const changedFiles = [...new Set([...changedPaths, ...untrackedPaths])]
  .filter((filePath) => {
    const absolutePath = join(repositoryRoot, filePath);
    return existsSync(absolutePath) && statSync(absolutePath).isFile();
  })
  .sort();

if (changedFiles.length === 0) {
  console.log('当前没有需要校验的 Git 改动文件。');
  process.exit(0);
}

const resolveToolEntry = (packageName) => {
  const packageJsonPath = require.resolve(`${packageName}/package.json`);
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const bin =
    typeof packageJson.bin === 'string'
      ? packageJson.bin
      : (packageJson.bin?.[packageName] ?? Object.values(packageJson.bin ?? {})[0]);

  if (!bin) {
    throw new Error(`无法解析 ${packageName} 的 CLI 入口。`);
  }

  return join(dirname(packageJsonPath), bin);
};

const splitIntoBatches = (files, maxLength = 12_000) => {
  const batches = [];
  let batch = [];
  let length = 0;

  for (const file of files) {
    if (batch.length > 0 && length + file.length + 1 > maxLength) {
      batches.push(batch);
      batch = [];
      length = 0;
    }

    batch.push(file);
    length += file.length + 1;
  }

  if (batch.length > 0) {
    batches.push(batch);
  }

  return batches;
};

const runTool = (packageName, args, files) => {
  if (files.length === 0) {
    return;
  }

  const toolEntry = resolveToolEntry(packageName);
  for (const batch of splitIntoBatches(files)) {
    const result = spawnSync(process.execPath, [toolEntry, ...args, ...batch], {
      cwd: repositoryRoot,
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
};

const scriptExtensions = new Set(['.cjs', '.cts', '.js', '.mjs', '.mts', '.ts', '.vue']);
const styleExtensions = new Set(['.less']);
const scriptFiles = changedFiles.filter((file) => scriptExtensions.has(extname(file)));
const styleFiles = changedFiles.filter((file) => styleExtensions.has(extname(file)));

console.log(`正在格式化 ${changedFiles.length} 个改动文件...`);
runTool('prettier', ['--write', '--ignore-unknown'], changedFiles);

console.log(`正在检查 ${scriptFiles.length} 个脚本或 Vue 文件...`);
runTool('eslint', [], scriptFiles);

console.log(`正在检查 ${styleFiles.length} 个样式文件...`);
runTool('stylelint', [], styleFiles);

console.log('正在复核改动文件格式...');
runTool('prettier', ['--check', '--ignore-unknown'], changedFiles);

console.log('改动文件的格式、ESLint 与 Stylelint 校验已通过。');

import { access, readdir } from 'node:fs/promises';
import path from 'node:path';

const PRIVATE_DIRECTORIES = new Set(['shared', 'style']);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function discoverPublicEntries(packageRoot) {
  const sourceRoot = path.join(packageRoot, 'src');
  const directories = await readdir(sourceRoot, { withFileTypes: true });
  const entries = [];

  for (const directory of directories) {
    if (!directory.isDirectory() || PRIVATE_DIRECTORIES.has(directory.name)) continue;

    const source = path.join(sourceRoot, directory.name, 'index.ts');
    if (!(await exists(source))) continue;

    const styleSource = path.join(sourceRoot, directory.name, 'style', 'index.less');
    entries.push({
      name: directory.name,
      source,
      styleSource: (await exists(styleSource)) ? styleSource : undefined,
    });
  }

  return entries.sort((left, right) => left.name.localeCompare(right.name));
}

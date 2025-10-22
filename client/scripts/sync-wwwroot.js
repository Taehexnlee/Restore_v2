import { readdir, mkdir, copyFile, rm, stat, readlink, symlink } from 'node:fs/promises';
import { join } from 'node:path';

const sourceDir = join(process.cwd(), '..', 'API', 'wwwroot');
const distDir = join(process.cwd(), 'dist');

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

async function copyDirectory(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const link = await readlink(srcPath);
      await symlink(link, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  if (!(await pathExists(sourceDir))) {
    console.error(`Expected build output at "${sourceDir}" but it was not found.`);
    process.exitCode = 1;
    return;
  }

  await rm(distDir, { recursive: true, force: true });
  await copyDirectory(sourceDir, distDir);
  console.log(`Synced "${sourceDir}" to "${distDir}".`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

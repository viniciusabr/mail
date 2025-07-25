import { replaceInFile } from 'replace-in-file';
import { readdir, stat } from 'fs/promises';
import path from 'path';

const baseDir = './src';

const getJsFilesRecursively = async (dir) => {
  let results = [];
  const list = await readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const statFile = await stat(filePath);
    if (statFile && statFile.isDirectory()) {
      if (file === 'node_modules' || file === '.vscode') continue;
      const res = await getJsFilesRecursively(filePath);
      results = results.concat(res);
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  }
  return results;
};

const fixFiles = async () => {
  const files = await getJsFilesRecursively(baseDir);

  // 1. module.exports -> export default
  await replaceInFile({
    files,
    from: /module\.exports\s*=\s*/g,
    to: 'export default ',
  });

  // 2. require() -> import
  await replaceInFile({
    files,
    from: /const\s+(\w+)\s*=\s*require\(['"](.+?)['"]\);?/g,
    to: 'import $1 from \'$2\';',
  });

  // 3. Add .js to relative imports (sem extensão)
  await replaceInFile({
    files,
    from: /from\s+['"](\.\/.*?)(?<!\.js)['"]/g,
    to: 'from \'$1.js\'',
  });

  console.log('✅ Projeto convertido para ESModules com sucesso!');
};

fixFiles().catch((err) => {
  console.error('❌ Erro durante conversão:', err);
});

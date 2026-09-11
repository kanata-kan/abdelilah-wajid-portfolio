import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'src');
const errors = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && /\.(?:ts|tsx|js|mjs|css)$/.test(entry.name)) {
      const text = await readFile(full, 'utf8');
      if (/(?:\.\.\/)+docs\/|\/?docs\/design\//.test(text)) {
        errors.push(path.relative(root, full));
      }
    }
  }
}

await walk(sourceRoot);

if (errors.length) {
  console.error(`FAIL application source imports/addresses documentation directly:\n${errors.map((file) => `- ${file}`).join('\n')}`);
  console.error('Use src/generated/design-v1 runtime mirrors; tests/scripts may read the frozen docs contract intentionally.');
  process.exitCode = 1;
} else {
  console.log('PASS src/ is independent from docs/; frozen contract access is limited to sync/verification tooling.');
}

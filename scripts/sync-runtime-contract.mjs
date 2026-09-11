import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'docs/design/v1.0/05-implementation');
const targetRoot = path.join(root, 'src/generated/design-v1');
const check = process.argv.includes('--check');

const files = [
  ['content/en.json', 'content/en.json'],
  ['content/ar.json', 'content/ar.json'],
  ['links.json', 'links.json'],
  ['fonts/Inter-Variable.woff2', 'fonts/Inter-Variable.woff2'],
  ['fonts/IBMPlexSansArabic-Regular.woff2', 'fonts/IBMPlexSansArabic-Regular.woff2'],
  ['fonts/IBMPlexSansArabic-Medium.woff2', 'fonts/IBMPlexSansArabic-Medium.woff2'],
  ['fonts/IBMPlexSansArabic-SemiBold.woff2', 'fonts/IBMPlexSansArabic-SemiBold.woff2'],
  ['fonts/IBMPlexSansArabic-Bold.woff2', 'fonts/IBMPlexSansArabic-Bold.woff2'],
];

for (const [sourceRelative, targetRelative] of files) {
  const source = path.join(sourceRoot, sourceRelative);
  const target = path.join(targetRoot, targetRelative);
  const bytes = await readFile(source);

  if (check) {
    let runtime;
    try {
      runtime = await readFile(target);
    } catch {
      assert.fail(`Missing generated runtime contract file: ${path.relative(root, target)}`);
    }
    assert.deepEqual(runtime, bytes, `Runtime contract drift: ${path.relative(root, target)}. Run node scripts/sync-runtime-contract.mjs`);
  } else {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
  }
}

console.log(`${check ? 'PASS' : 'SYNCED'} ${files.length} runtime contract files from the frozen design source.`);

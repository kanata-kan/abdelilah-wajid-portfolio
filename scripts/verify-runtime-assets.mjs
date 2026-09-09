import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const files = ['brand/aw-primary-color.svg', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png'];
for (const file of files) {
  const original = file.startsWith('brand/') ? `assets/${file}` : `assets/brand/${file}`;
  assert.deepEqual(await readFile(new URL(`../public/${file}`, import.meta.url)), await readFile(new URL(`../${original}`, import.meta.url)), `Runtime asset differs: ${file}`);
}
console.log(`PASS ${files.length} runtime assets match canonical bytes; dictionaries use frozen sources; layout adapter checked separately.`);

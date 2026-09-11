import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const files = ['brand/aw-primary-color.svg', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png'];
for (const file of files) {
  const original = file.startsWith('brand/') ? `assets/${file}` : `assets/brand/${file}`;
  assert.deepEqual(await readFile(new URL(`../public/${file}`, import.meta.url)), await readFile(new URL(`../${original}`, import.meta.url)), `Runtime asset differs: ${file}`);
}
const media = {
  'images/profile/abdelilah-wajid-product-engineer-portrait-mobile.webp': 'a000acc8417ee37e068931cb1e43bc26d10f8336ddbbe07684f5131c881a18b6',
  'images/profile/abdelilah-wajid-product-engineer-portrait-desktop.webp': '88c502af4e3dac4ef03dd2fc797ddcf55792e9efd52ce92fb01f9b62bcbba27c',
  'images/work/youin/guest-review-management.webp': 'daf4d1306077c10ae31b6f2532ac2f99f3aa5e7c21de09db7420bfcc54f86ecb',
};
for (const [file, expected] of Object.entries(media)) {
  const value = await readFile(new URL(`../public/${file}`, import.meta.url));
  assert.equal(createHash('sha256').update(value).digest('hex'), expected, `Runtime media differs: ${file}`);
}
console.log(`PASS ${files.length} canonical identity assets and ${Object.keys(media).length} approved media derivatives match recorded bytes; runtime contract/layout sync is checked separately.`);

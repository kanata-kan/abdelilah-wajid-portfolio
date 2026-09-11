import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const socket = createServer();
await new Promise((resolve, reject) => { socket.once('error', reject); socket.listen(0, '127.0.0.1', resolve); });
const { port } = socket.address();
await new Promise((resolve) => socket.close(resolve));
const base = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
  cwd: root, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, stdio: ['ignore', 'pipe', 'pipe'],
});
let log = '';
child.stdout.on('data', (chunk) => { log += chunk; });
child.stderr.on('data', (chunk) => { log += chunk; });
const exited = new Promise((resolve) => child.once('exit', resolve));
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function get(path) {
  const response = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(5000) });
  return { response, body: await response.text() };
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (child.exitCode !== null) throw new Error(`Production server exited: ${log}`);
    try { await get('/en/'); ready = true; break; } catch { await delay(250); }
  }
  assert.ok(ready, `Production server did not become ready: ${log}`);
  const stylesheets = new Set();
  for (const locale of ['en', 'ar']) {
    const copy = JSON.parse(await readFile(new URL(`../docs/design/v1.0/05-implementation/content/${locale}.json`, import.meta.url), 'utf8'));
    const { response, body } = await get(`/${locale}/`);
    assert.equal(response.status, 200, locale);
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    assert.match(body, new RegExp(`<html[^>]*lang="${locale}"[^>]*dir="${copy.direction}"`));
    const initialHtml = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.ok(initialHtml.includes(copy.hero.title), `${locale}: H1 absent from initial HTML`);
    assert.ok(initialHtml.includes(copy.hero.body), `${locale}: copy absent from initial HTML`);
    assert.equal((initialHtml.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(initialHtml.includes(`<title>${copy.meta.title}</title>`));
    assert.match(initialHtml, /name="robots" content="noindex, nofollow"/);
    assert.match(initialHtml, /href="\/en\/"/);
    assert.match(initialHtml, /href="\/ar\/"/);
    assert.doesNotMatch(initialHtml, /href="#"|href=""|hreflang="x-default"/);
    if (!process.env.SITE_ORIGIN) assert.doesNotMatch(initialHtml, /rel="canonical"/);
    const schema = JSON.parse(body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@type'], 'Person');
    assert.equal(schema.name, copy.brand.name);
    for (const [, href] of body.matchAll(/href="([^" ]+\.css(?:\?[^" ]*)?)"/g)) stylesheets.add(href);
    console.log(`PASS /${locale}/: initial copy, H1, lang/dir, metadata, preview policy, locale links and visible-identity schema.`);
  }
  for (const path of ['/', '/fr/', '/EN/', '/ar-MA/', '/en/unknown/', '/en/work/youin-guest-review/']) {
    assert.equal((await get(path)).response.status, 404, `${path} must not fall back or implement a pending route`);
  }
  for (const locale of ['en', 'ar']) {
    const { response } = await get(`/${locale}`);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), `/${locale}/`);
  }
  const fonts = new Set();
  for (const path of stylesheets) {
    const { response, body } = await get(path);
    assert.equal(response.status, 200);
    for (const [, url] of body.matchAll(/url\(["']?([^\s)"']+\.woff2)["']?\)/g)) fonts.add(new URL(url, new URL(path, base)).href);
  }
  const originals = await Promise.all(['Inter-Variable', 'IBMPlexSansArabic-Regular', 'IBMPlexSansArabic-Medium', 'IBMPlexSansArabic-SemiBold', 'IBMPlexSansArabic-Bold'].map(async (name) => hash(await readFile(new URL(`../docs/design/v1.0/05-implementation/fonts/${name}.woff2`, import.meta.url)))));
  const fetchedHashes = new Set();
  for (const url of fonts) {
    assert.equal(new URL(url).origin, base, 'Font must be local');
    const response = await fetch(url);
    assert.equal(response.status, 200, url);
    fetchedHashes.add(hash(Buffer.from(await response.arrayBuffer())));
  }
  for (const fingerprint of originals) assert.ok(fetchedHashes.has(fingerprint), 'Missing or altered original font');
  for (const [url, file] of [['/brand/aw-primary-color.svg', 'aw-primary-color.svg'], ['/favicon.svg', 'favicon.svg'], ['/favicon.ico', 'favicon.ico'], ['/apple-touch-icon.png', 'apple-touch-icon.png']]) {
    const response = await fetch(`${base}${url}`);
    assert.equal(response.status, 200);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(await readFile(new URL(`../assets/brand/${file}`, import.meta.url))));
  }
  const media = [
    '/images/profile/abdelilah-wajid-product-engineer-portrait-mobile.webp',
    '/images/profile/abdelilah-wajid-product-engineer-portrait-desktop.webp',
    '/images/work/youin/guest-review-management.webp',
  ];
  for (const path of media) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(await readFile(new URL(`../public${path}`, import.meta.url))), path);
  }
  const robots = await get('/robots.txt');
  assert.equal(robots.response.status, 200);
  assert.match(robots.body, /Disallow: \//);
  const sitemap = await get('/sitemap.xml');
  assert.equal(sitemap.response.status, 200);
  assert.doesNotMatch(sitemap.body, /<loc>/);
  assert.doesNotMatch(log, /Error:|Hydration failed|Module not found/);
  console.log(`PASS 6 pending/unknown routes return 404; slash normalization; ${originals.length} original local fonts; 4 byte-exact identity assets; ${media.length} byte-exact media assets; private robots and empty sitemap.`);
} catch (error) {
  console.error(log);
  throw error;
} finally {
  child.kill();
  await exited;
}

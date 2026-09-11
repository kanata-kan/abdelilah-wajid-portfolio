import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// No network, dependencies, mutations or Git configuration changes.
const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const required = [
  'README.md', 'AGENTS.md', 'RIGHTS.md',
  'docs/PROJECT-CONTEXT.md', 'docs/CURRENT-STATE.md',
  'docs/CONTENT-AND-CLAIMS.md', 'docs/SEO-GEO.md',
  'docs/QA-AND-RELEASE.md', 'docs/AI-EXECUTION-GUIDE.md',
  'docs/SOURCE-OF-TRUTH.md', 'docs/IMPLEMENTATION-ROADMAP.md',
  'docs/ASSET-MANIFEST.md', 'docs/OPEN-DECISIONS.md',
  'docs/PHASE-0-VERIFICATION.md', 'docs/PHASE-1-VERIFICATION.md',
  'docs/PHASE-2-VERIFICATION.md', 'docs/CODEX-USAGE.md',
  'docs/design/v1.0/README.md',
  'docs/architecture/ADR-001-foundation.md',
  'docs/architecture/ADR-002-i18n-seo-geo.md',
  'docs/architecture/ADR-003-design-contract.md',
  'docs/provenance/imports.json', 'docs/provenance/source-index.json',
  'docs/provenance/toolchain.json',
];

async function exists(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}

function insideRoot(file) {
  const relative = path.relative(root, file);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

async function json(relative) {
  return JSON.parse(await readFile(path.join(root, relative), 'utf8'));
}

async function walk(directory) {
  const found = [];
  const excluded = new Set(['.git', '.local', 'node_modules', '.next', 'out', 'dist', 'coverage']);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.isSymbolicLink()) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) found.push(full);
  }
  return found;
}

function leaves(value, prefix = '', result = {}) {
  if (value !== null && typeof value === 'object') {
    result[prefix] = Array.isArray(value) ? `array:${value.length}` : 'object';
    for (const [key, child] of Object.entries(value)) leaves(child, prefix ? `${prefix}.${key}` : key, result);
  } else {
    result[prefix] = value === null ? 'null' : typeof value;
  }
  return result;
}

for (const relative of required) {
  if (!await exists(path.join(root, relative))) errors.push(`Missing required file: ${relative}`);
}

const markdown = await walk(root);
let linkCount = 0;
for (const file of markdown) {
  const text = (await readFile(file, 'utf8'))
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '');
  for (const match of text.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target = match[1].trim();
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
    const cleaned = target.startsWith('<') ? target.slice(1, target.indexOf('>')) : target.split(/\s+"/)[0];
    const relative = decodeURIComponent(cleaned.split('#')[0]);
    if (!relative) continue;
    const destination = path.resolve(path.dirname(file), relative);
    linkCount++;
    if (!insideRoot(destination) || !await exists(destination)) {
      errors.push(`Broken or nonportable file link in ${path.relative(root, file)}: ${target}`);
    }
  }
}

let importCount = 0;
try {
  const manifest = await json('docs/provenance/imports.json');
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.files) || !manifest.files.length) {
    throw new Error('Empty or invalid imports manifest');
  }
  const seen = new Set();
  for (const item of manifest.files) {
    const file = path.resolve(root, item.path);
    if (seen.has(item.path) || !insideRoot(file)) {
      errors.push(`Duplicate or unsafe import path: ${item.path}`);
      continue;
    }
    seen.add(item.path);
    try {
      const bytes = await readFile(file);
      const hash = createHash('sha256').update(bytes).digest('hex');
      if (hash !== item.sha256.toLowerCase() || bytes.length !== item.bytes) {
        errors.push(`Imported source changed: ${item.path}`);
      }
      importCount++;
    } catch (error) { errors.push(`Unreadable import ${item.path}: ${error.message}`); }
  }
} catch (error) { errors.push(`Import manifest: ${error.message}`); }

let contentFields = 0;
try {
  const prefix = 'docs/design/v1.0/05-implementation/content/';
  const en = await json(`${prefix}en.json`);
  const ar = await json(`${prefix}ar.json`);
  if (en.locale !== 'en' || en.direction !== 'ltr' || ar.locale !== 'ar' || ar.direction !== 'rtl') {
    errors.push('Incorrect locale or direction in canonical content');
  }
  const enShape = leaves(en);
  const arShape = leaves(ar);
  for (const key of new Set([...Object.keys(enShape), ...Object.keys(arShape)])) {
    if (enShape[key] !== arShape[key]) errors.push(`EN/AR content shape mismatch: ${key}`);
  }
  contentFields = Object.keys(enShape).filter(key => enShape[key] === 'string').length;
  for (const relative of ['docs/provenance/source-index.json', 'docs/provenance/toolchain.json']) await json(relative);
} catch (error) { errors.push(`Content/provenance JSON: ${error.message}`); }

if (errors.length) {
  console.error(errors.map(error => `FAIL ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS ${required.length} required files; ${markdown.length} Markdown files; ${linkCount} local links; ${importCount} exact imports; ${contentFields} bilingual text fields.`);
  console.log('Scope: repository documentation and source integrity only. No app, browser, remote-link or deployment verification.');
}

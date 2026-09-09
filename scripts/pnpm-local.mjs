import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';

// Windows convenience: use project-local pinned tools, without global PATH changes.
const root = fileURLToPath(new URL('../', import.meta.url));
const node = resolve(root, '.local/toolchain/node_modules/node/bin', process.platform === 'win32' ? 'node.exe' : 'node');
const pnpm = resolve(root, '.local/toolchain/node_modules/pnpm/bin/pnpm.mjs');
if (!existsSync(node) || !existsSync(pnpm)) {
  throw new Error('Bootstrap first: npm.cmd install --prefix .local/toolchain --no-save --package-lock=false node@24.20.0 pnpm@12.3.4');
}
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };
const pathKey = Object.keys(env).find((key) => key.toLowerCase() === 'path') ?? 'PATH';
const toolBins = resolve(root, '.local/toolchain/node_modules/.bin');
env[pathKey] = `${dirname(node)}${delimiter}${toolBins}${delimiter}${env[pathKey] ?? ''}`;
const child = spawn(node, [pnpm, ...process.argv.slice(2)], { cwd: root, env, stdio: 'inherit' });
child.on('error', (error) => { console.error(error); process.exitCode = 1; });
child.on('exit', (code) => { process.exitCode = code ?? 1; });

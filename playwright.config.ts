/// <reference types="node" />

import { defineConfig } from "@playwright/test";

const webServerCommand = process.env.CI
  ? "pnpm exec next start --hostname 127.0.0.1 --port 3102"
  : "node scripts/pnpm-local.mjs start --port 3102";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",

  use: {
    baseURL: "http://127.0.0.1:3102",
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: webServerCommand,
    url: "http://127.0.0.1:3102/en/",
    reuseExistingServer: false,
    timeout: 60000,
  },
});

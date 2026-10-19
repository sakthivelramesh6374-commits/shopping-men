import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "3000";
const baseURL = `http://127.0.0.1:${port}`;
const serverCommand = process.env.PLAYWRIGHT_USE_PRODUCTION === "1" ? "npm run start" : "npm run dev";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  globalSetup: "./e2e/global-setup.ts",
  use: {
    baseURL,
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: `${serverCommand} -- --hostname 127.0.0.1 --port ${port}`,
    url: `${baseURL}/api/health`,
    reuseExistingServer: !process.env.CI,
    env: {
      DATABASE_PATH: process.env.E2E_DATABASE_PATH ?? "./data/shopease-e2e.db",
      NEXT_DIST_DIR: process.env.NEXT_DIST_DIR ?? ".next",
    },
    timeout: 120_000,
  },
});

import { defineConfig } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: process.env.TESTING_TOOL === "true" ? "./testingTool" : "./e2e",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: "http://localhost:5173/outfit",
  },
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

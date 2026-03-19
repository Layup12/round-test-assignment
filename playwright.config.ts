import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 10_000,
  use: {
    baseURL: 'http://localhost:4173',
    headless: false,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm exec vite --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});

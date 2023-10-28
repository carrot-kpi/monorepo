import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'always' }],
  ],
  use: {
    headless: false,
    // baseURL: 'https://app.staging.carrot.community/#/?chain=scroll+sepolia',
    baseURL: 'http://localhost:3000/#/?chain=scroll+sepolia',
    trace: 'on-first-retry',
  },
  // Browsers config
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
    },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

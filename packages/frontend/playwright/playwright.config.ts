import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    timeout: 80000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 30000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["list", { printSteps: true }],
        ["html", { open: "always" }],
    ],
    use: {
        baseURL: "https://app.staging.carrot.community/#/?chain=polygon+mumbai",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: process.env.CI ? "off" : "retain-on-failure",
        permissions: ["clipboard-read", "clipboard-write"],
        actionTimeout: 20000,
        navigationTimeout: 20000,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});

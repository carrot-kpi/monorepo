import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    timeout: 60000,
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [["list", { printSteps: true }]],
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                launchOptions: {
                    args: ["--disable-web-security"],
                },
            },
        },
        // {
        //     name: "firefox",
        //     use: { ...devices["Desktop Firefox"] },
        // },
        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ],
    webServer: {
        command: "yarn start:staging",
        timeout: 120 * 1_000,
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
    },
});

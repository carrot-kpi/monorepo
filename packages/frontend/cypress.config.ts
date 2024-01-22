import { defineConfig } from "cypress";

const TIMEOUT = 30_000;

export default defineConfig({
    retries: {
        runMode: process.env.CI ? 1 : 0,
        openMode: 0,
    },
    chromeWebSecurity: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    e2e: {
        setupNodeEvents(on: any, config: any) {
            on("task", {
                // Define your 'unzipping' task here
                unzip: ({ filePath }: { filePath: string }) => {
                    // Your 'unzipping' logic here
                    // Make sure to return a promise or a value from your task
                    return new Promise((resolve, reject) => {
                        // Your 'unzipping' implementation
                        // Resolve or reject based on success or failure
                    });
                },
            });
        },
        testIsolation: false,
        baseUrl:
            "https://app.staging.carrot.community/#/campaigns?chain=polygon+mumbai",
        specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
        supportFile: "cypress/support/e2e.ts",
    },
    defaultCommandTimeout: TIMEOUT,
    pageLoadTimeout: TIMEOUT,
    requestTimeout: TIMEOUT,
});

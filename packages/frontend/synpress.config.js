const { defineConfig } = require("cypress");
const setupNodeEvents = require("@synthetixio/synpress/plugins/index");

const TIMEOUT = 30_000;

module.exports = defineConfig({
    userAgent: "synpress",
    fixturesFolder: "@synthetixio/synpress/fixtures",
    retries: {
        runMode: process.env.CI ? 1 : 0,
        openMode: 0,
    },
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    env: {
        coverage: false,
    },
    defaultCommandTimeout: TIMEOUT,
    pageLoadTimeout: TIMEOUT,
    requestTimeout: TIMEOUT,
    e2e: {
        testIsolation: false,
        setupNodeEvents,
        baseUrl: "http://127.0.0.1:3000",
        specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
        supportFile: "cypress/support.ts",
    },
});

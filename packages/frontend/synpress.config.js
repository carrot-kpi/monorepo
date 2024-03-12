const { defineConfig } = require("cypress");
const setupNodeEvents = require("@synthetixio/synpress/plugins/index");

const TIMEOUT = 10_000;

module.exports = defineConfig({
    userAgent: "synpress",
    fixturesFolder: "@synthetixio/synpress/fixtures",
    retries: {
        runMode: process.env.CI ? 1 : 0,
        openMode: 0,
    },
    chromeWebSecurity: true,
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
        baseUrl: process.env.ENV,
        specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
        supportFile: "cypress/support.ts",
    },
});

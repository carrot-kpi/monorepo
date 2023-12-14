const { defineConfig } = require("cypress");
const { setupHardhatEvents } = require("cypress-hardhat");

module.exports = defineConfig({
    video: false,
    defaultCommandTimeout: 24000,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    retries: {
        runMode: process.env.CYPRESS_RETRIES ? +process.env.CYPRESS_RETRIES : 1,
    },
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            setupHardhatEvents(on, config);
        },
        baseUrl: "https://app.staging.carrot.community/",
        supportFile: "cypress/support/e2e.ts",
        specPattern: "cypress/e2e/**/*.test.ts",
    },
});

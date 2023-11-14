import { test } from "../utils/fixtures";
/**
 *@description Smoke test for Carrot Home page
 */
test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});
test.describe("Smoke test for Carrot Home page", () => {
    test.only("Check header", async ({ homePage }) => {
        await test.step("Staging banner is visible", async () => {
            await homePage.checkStagingBanner();
        });
        await test.step("About button redirects to Carrot community page", async () => {
            await homePage.checkAboutButtonRedirection();
        });
        await test.step("Campaign button redirects to All campaigns page", async () => {
            await homePage.goToAllCampaignsFromHeader();
            await homePage.checkIfOnAllCampaignsPage();
            await homePage.goBack();
        });
    });
});

import { test } from "../utils/fixtures";
import { networks } from "../utils/data/data";
/**
 *@description Smoke test for Carrot Home page
 */
test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});
test.describe("Carrot Smoke test", () => {
    test("Check header", async ({ homePage }) => {
        await test.step("Staging banner is visible", async () => {
            await homePage.checkStagingBanner();
        });
        await test.step("About button redirects to Carrot community page", async () => {
            await homePage.checkAboutButtonRedirection();
        });
        await test.step("Campaign button redirects to All campaigns page", async () => {
            await homePage.clickCampaignsHeader();
            await homePage.checkIfOnAllCampaignsPage();
            await homePage.goBack();
        });
        await test.step("Check default selected network", async () => {
            await homePage.checkSelectedNetwork(networks.polygonMumbai);
        });
        await test.step("Check Network dropdown options", async () => {
            await homePage.checkNetworkOptions();
        });
        await test.step("Check connect wallet dropdown options", async () => {
            await homePage.checkWalletOptions();
        });
        await test.step("Check Settings dropdown", async () => {
            await homePage.checkSettingsDropdown();
        });
        await test.step("Switch to Scroll Sepolia network", async () => {
            await homePage.selectNetwork(networks.scrollSepolia);
        });
        await test.step("Scroll Sepolia network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.scrollSepolia);
        });
        await test.step("Switch to Sepolia network", async () => {
            await homePage.selectNetwork(networks.sepolia);
        });
        await test.step("Sepolia network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.sepolia);
        });
        await test.step("Switch to Polygon Mumbai network", async () => {
            await homePage.selectNetwork(networks.polygonMumbai);
        });
        await test.step("Polygon Mumbai network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.polygonMumbai);
        });
        await test.step("Switch to Scroll Sepolia network", async () => {
            await homePage.selectNetwork(networks.scrollSepolia);
        });
        await test.step("Scroll Sepolia network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.scrollSepolia);
        });
        await test.step("Switch to Sepolia network", async () => {
            await homePage.selectNetwork(networks.sepolia);
        });
        await test.step("Sepolia network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.sepolia);
        });
        await test.step("Switch to Polygon Mumbai network", async () => {
            await homePage.selectNetwork(networks.polygonMumbai);
        });
        await test.step("Polygon Mumbai network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.polygonMumbai);
        });
    });
});

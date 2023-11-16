import { test } from "../utils/fixtures";
import { networks, footerLinks } from "../utils/data/data";
/**
 *@description Smoke test for Carrot Home page
 */
test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});
test.describe("Carrot Smoke test", () => {
    test("Home page assertions and redirections", async ({ homePage }) => {
        await test.step("Staging banner is visible", async () => {
            await homePage.checkStagingBanner();
        });
        await test.step("About button redirects to Carrot community page", async () => {
            await homePage.checkAboutButtonRedirection();
        });
        await test.step("Campaigns button redirects to All campaigns page", async () => {
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
        // todo: network switching steps can be refactored to go in loop
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
        await test.step("Hero section text", async () => {
            await homePage.checkTextOnHomePage();
        });
        // todo: next to steps depend on each other think of better solution
        await test.step("Create campaign button redirects to Create campaign page", async () => {
            await homePage.checkCreateCampaignButtonRedirection();
        });
        await test.step("No wallet: users sees Wallet disconnected notification", async () => {
            await homePage.checkWalletDisconnectedText();
            await homePage.goBack();
        });
        await test.step("Check How it work video", async () => {
            await homePage.checkHowItWorksPreview();
        });
        await test.step("Check first campaign title", async () => {
            await homePage.checkFirstCampaign();
        });
        // todo: have some compiling troubles on local env after redirection
        // await test.step("View campaign button redirects to campaigns page", async () => {
        //     await homePage.checkRedirectionToFirstCampaign();
        // });
        await test.step("View all campaigns button redirects to All campaigns page", async () => {
            await homePage.clickViewAllCampaigns();
            await homePage.checkIfOnAllCampaignsPage();
            await homePage.goBack();
        });
        await test.step("Check first template title", async () => {
            await homePage.checkFirstTemplate();
        });
        await test.step("Use template button redirects to Create campaign page for that template", async () => {
            await homePage.checkRedirectionToFirstTemplate();
        });
        //---Footer
        await test.step("Footer - Documentation redirects to docs Carrot community", async () => {
            await homePage.checkFooterDocumentationButtonRedirection();
        });
        await test.step("Footer - Audits redirects to Carrot GitHub", async () => {
            await homePage.checkFooterAuditsButtonRedirection();
        });
        await test.step("Footer - Discord redirects to Carrot Discord", async () => {
            await homePage.checkFooterDiscordButtonRedirection();
        });
        await test.step("Footer - Twitter redirects to Carrot Twitter", async () => {
            await homePage.checkFooterTwitterButtonRedirection();
        });
        await test.step("Footer - Carrot info page redirect to Carrot community", async () => {
            await homePage.checkFooterCarrotInfoPageButtonRedirection();
        });
    });
});

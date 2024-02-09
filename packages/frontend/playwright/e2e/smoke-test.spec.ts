import { test } from "../utils/fixtures";
import * as metamask from "../utils/metamask/metamask";
import { networks, wallets } from "../utils/data";

/**
 *@description Smoke test for Carrot Home page
 */
test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});
test.describe("Carrot Smoke test", () => {
    test("Guest no wallet - Home page assertions and redirections", async ({
        homePage,
    }) => {
        await test.step("Staging banner is visible", async () => {
            await homePage.checkStagingBanner();
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
        // await test.step("Switch to Scroll Sepolia network", async () => {
        //     await homePage.selectNetwork(networks.scrollSepolia);
        // });
        // await test.step("Scroll Sepolia network is selected", async () => {
        //     await homePage.checkSelectedNetwork(networks.scrollSepolia);
        // });
        // await test.step("Switch to Sepolia network", async () => {
        //     await homePage.selectNetwork(networks.sepolia);
        // });
        // await test.step("Sepolia network is selected", async () => {
        //     await homePage.checkSelectedNetwork(networks.sepolia);
        // });
        // await test.step("Switch to Polygon Mumbai network", async () => {
        //     await homePage.selectNetwork(networks.polygonMumbai);
        // });
        await test.step("Polygon Mumbai network is selected", async () => {
            await homePage.checkSelectedNetwork(networks.polygonMumbai);
        });
        await test.step("Check text on Home page", async () => {
            await homePage.checkTextOnHomePage();
        });
        await test.step("Create campaign button redirects to Create campaign page", async () => {
            await homePage.checkCreateCampaignButtonRedirection();
        });
        await test.step("Wallet disconnected modal is displayed", async () => {
            await homePage.checkWalletDisconnectedText();
            await homePage.goBack();
        });
        await test.step("Check How it work video", async () => {
            await homePage.checkHowItWorksPreview();
        });
        await test.step("Check random active campaign redirection", async () => {
            await homePage.pauseInSec(3); // takes time to load the page
            await homePage.checkActiveCampaign();
            await homePage.goBack();
        });
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
        await test.step("Wallet disconnected modal is displayed", async () => {
            await homePage.checkWalletDisconnectedText();
            await homePage.goBack();
        });
        await test.step("Check Footer links redirection", async () => {
            await homePage.checkFooterRedirections();
        });
    });
    test("User with connected wallet", async ({ homePage }) => {
        await test.step("Select Metamask wallet option", async () => {
            await homePage.selectWalletConnection(wallets.metamask);
        });
        await test.step("Connect wallet to Metamask", async () => {
            await metamask.connectWithMetamask();
        });
        await test.step("Check profile avatar is visible", async () => {
            await homePage.profileAvatarVisible();
        });
        await test.step("Check no recent activity in Transactions and Drafts", async () => {
            await homePage.checkProfileWithoutRecentActivity();
        });
        // todo: add this step once we have IDs
        // await test.step("Click on Address link redirects to Polygon scan", async () => {
        // });
        await test.step("Check Settings", async () => {
            await homePage.checkSettings();
            await homePage.clickAnyWhereToClose();
        });
        await test.step("Create campaign button redirects to Create campaign page", async () => {
            await homePage.checkCreateCampaignButtonRedirection();
        });
        await test.step("Welcome to Carrot modal is displayed", async () => {
            console.log(
                "TODO: add assertion when we have selectors for this modal",
            );
            await homePage.goBack();
        });
        await test.step("Use template button redirects to Create campaign page for that template", async () => {
            await homePage.checkRedirectionToFirstTemplate();
        });
        await test.step("Welcome to Carrot modal is displayed", async () => {
            console.log(
                "TODO: add assertion when we have selectors for this modal",
            );
            await homePage.goBack();
        });
        await test.step("Logout", async () => {
            await homePage.logout();
        });
    });
});

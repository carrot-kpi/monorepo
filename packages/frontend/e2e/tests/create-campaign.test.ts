import { test } from "../utils/fixtures";
/**
 *@description Create campaign test
 */

test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});
test.describe("Create different campaigns", () => {
    test("Create campaign", async ({ homePage, createCampaign }) => {
        await test.step("Connect to Metamask", async () => {
            await homePage.connectWallet();
        });
        await test.step("Verify wallet is connected", async () => {
            await homePage.profileIconVisible();
        });
        await test.step("Check text on autorization modal", async () => {
            await createCampaign.checkAuthenticateModalText();
        });
        await test.step("Click Sign on authorization modal", async () => {
            await createCampaign.clickSign();
        });
        await test.step("Sign on Metamask notification", async () => {
            await createCampaign.confirmSignatureOnMetamask();
        });
        // General step
        await test.step("Enter general data", async () => {
            await createCampaign.enterGeneralData();
        });
        await test.step("Click next on General step", async () => {
            await createCampaign.clickNextOnStep("general");
        });
        // Rewards step
        await test.step("Enter rewards data", async () => {
            await createCampaign.enterRewardsData();
        });
        await test.step("Click Add to campaign", async () => {
            await createCampaign.clickAddToCampaign();
        });
        await test.step("Click next on Rewards step", async () => {
            await createCampaign.clickNextOnStep("rewards");
        });
        // Oracle step
        await test.step("Enter oracle data", async () => {
            await createCampaign.enterOracleData();
        });
        await test.step("Click next on Oracle step", async () => {
            await createCampaign.clickNextOnStep("oracle");
        });
        await test.step("Click Approve selected token", async () => {
            await createCampaign.clickApprove();
        });
        await test.step("Approve token on Metamask", async () => {
            await createCampaign.approveTokenOnMetamask();
        });
        // Deploy step
        await test.step("Click deploy your campaign", async () => {
            await createCampaign.clickDeployYourCampaign();
            await homePage.pauseInSec(10);
        });
        await test.step("Click go to campaign", async () => {
            await createCampaign.clickGoToCampaign();
            await homePage.pauseInSec(10);
        });
        await test.step("Assert new campaign title", async () => {
            // todo
        });
    });
});

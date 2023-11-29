import { test } from "../utils/fixtures";
/**
 *@description Basic connect wallet on Polygon Mumbai network

test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
});
test("connect with metamask", async ({ homePage }) => {
    await test.step("connect to metamask", async () => {
        await homePage.connectWallet();
    });
    await test.step("verify wallet is connected", async () => {
        await homePage.profileIconVisible();
    });
});

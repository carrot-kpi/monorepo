import { test, expect } from "../tests/utils/fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";

/**
 * @description Test for connecting Carrot app to Metamask wallet
 */

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("Connect to Carrot with Metamask", async ({ page }) => {
    await test.step("Select network drop down", async () => {
        await page.locator("div").getByText("Network").nth(2).click();
    });
    await test.step("Click Sepolia network", async () => {
        await page.getByTestId("Sepolia-network-button").nth(1).click();
    });
    await test.step("Click Connect wallet", async () => {
        await page.getByTestId("connect-wallet-button").nth(1).click();
    });
    await test.step("Click Metamask", async () => {
        await page.getByTestId("metaMask-wallet-button").nth(1).click();
    });
    await test.step("Connect to Metamask", async () => {
        await metamask.acceptAccess();
    });
    await test.step("Verify wallet is connected", async () => {
        await expect(
            page.getByTestId("profile-avatar-button").nth(1)
        ).toBeVisible();
    });
});

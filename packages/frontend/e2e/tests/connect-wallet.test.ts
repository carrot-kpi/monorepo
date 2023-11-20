import { test, expect } from "../utils/fixtures";
import { acceptAccess } from "@synthetixio/synpress/commands/metamask";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("connect with metamask", async ({ page }) => {
    await test.step("select network drop down", async () => {
        await page.locator("div").getByText("Network").nth(2).click();
    });

    await test.step("click sepolia network", async () => {
        await page.getByTestId("Sepolia-network-button").nth(1).click();
    });

    await test.step("click connect wallet", async () => {
        await page.getByTestId("connect-wallet-button").nth(1).click();
    });

    await test.step("click metamask", async () => {
        await page.getByTestId("metaMask-wallet-button").nth(1).click();
    });

    await test.step("connect to metamask", async () => {
        await acceptAccess();
    });

    await test.step("verify wallet is connected", async () => {
        await expect(
            page.getByTestId("profile-avatar-button").nth(1),
        ).toBeVisible();
    });
});

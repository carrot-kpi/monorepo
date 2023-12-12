import { test } from "@guardianui/test";
import { expect } from "@playwright/test";

test.describe("metamask connect", () => {
    test("select network drop down", async ({ page, gui }) => {
        await gui.initializeChain(1);
        await page.goto("/");

        await gui.setEthBalance("100000000000000000000000");

        await page.getByTestId("connect-wallet-button").nth(1).click();
        await page.getByTestId("metaMask-wallet-button").nth(1).click();
    });

    test("verify wallet is connected", async ({ page }) => {
        expect(page.getByTestId("profile-avatar-button").nth(1)).toBeDefined();
    });
});

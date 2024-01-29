import { test, expect } from "../utils/fixtures";
import * as metamask from "../utils/metamask/metamask";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("connect with metamask", async ({ page }) => {
    await test.step("click connect wallet", async () => {
        await page.getByTestId("connect-wallet-button").click();
    });

    await test.step("click metamask", async () => {
        await page.getByTestId("metaMask-wallet-button").click();
    });

    await test.step("connect to metamask", async () => {
        await metamask.signMetamaskTransaction();
    });

    await test.step("verify wallet is connected", async () => {
        await expect(page.getByTestId("header-Campaigns-button")).toBeVisible();
    });
});

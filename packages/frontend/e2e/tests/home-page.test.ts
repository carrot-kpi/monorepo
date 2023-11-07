import { test } from "../fixtures";

test("home page", async ({ page }) => {
    await test.step("navigate to home page", async () => {
        await page.goto("/");
    });

    await test.step("about visible", async () => {
        await page.locator("div").getByText("About`").nth(1).isVisible();
    });

    await test.step("campaigns visible", async () => {
        await page.locator("div").getByText("Campaign").nth(1).isVisible();
    });

    await test.step("connect wallet button visible", async () => {
        await page
            .locator("div")
            .getByText("Connect wallet")
            .nth(1)
            .isVisible();
    });
});

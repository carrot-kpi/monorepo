import { test } from "playwright/test";

// test.beforeEach(async ({ page }) => {
//     await page.goto("/");
// });

test("Test", async ({ page }) => {
    await test.step("Staging banner is visible", async () => {
        console.log("here");
    });
});

import { test } from "..//utils/fixtures";

test.beforeEach(async ({ homePage }) => {
    await test.step("Navigate to Carrot Home page", async () => {
        await homePage.goToHomePage();
    });
});

test("Test", async ({ homePage }) => {
    await test.step("Staging banner is visible", async () => {
        await test.step("Staging banner is visible", async () => {
            await homePage.checkStagingBanner();
        });
    });
});

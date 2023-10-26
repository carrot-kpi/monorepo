import { test, expect } from "../tests/utils/fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";

/**
 * @description Test for connecting Carrot app to Metamask wallet
 */

test.beforeEach(async ({ page }) => {
  await page.goto("https://app.staging.carrot.community/#/?chain=sepolia");
});

test("Connect to Carrot with Metamask", async ({ page }) => {
  // await test.step('Select network drop down', async () => {
  //     await page.locator('div').getByText('Network').nth(2).click()
  // })
  //await test.step('Click Sepolia network', async () => {
    //await page.locator('p').getByText('Sepolia').nth(2).click()
  //})
  await test.step('Click Connect wallet', async () => {
    await page.locator('div').getByText('Connect wallet').nth(1).click()
  })
  await test.step('Click Metamask', async () => {
    await page.locator('div').getByText('MetaMask').nth(3).click();
  })
  await test.step('Connect to Metamask', async () => {
    await metamask.acceptAccess();
    await expect(page.locator("#accounts")).toHaveText(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );
})
  
});
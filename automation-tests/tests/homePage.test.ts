//import { test, expect, selectors } from '@playwright/test';
import { test, expect } from "../tests/utils/fixtures";

test('Carrot Home page', async ({ page }) => {
    await test.step('Navigate to Home page', async () => {
        await page.goto('https://app.staging.carrot.community/#/?chain=sepolia');
    })
    await test.step('About visible', async () => {
        await page.locator('div').getByText('About`').nth(1).isVisible();
    })
    await test.step('Campaigns visible', async () => {
        await page.locator('div').getByText('Campaign').nth(1).isVisible();
    })
    await test.step('Connect wallet button visible', async () => {
        await page.locator('div').getByText('Connect wallet').nth(1).isVisible();
    })
});
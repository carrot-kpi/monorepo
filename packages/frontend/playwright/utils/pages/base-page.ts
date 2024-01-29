import { expect, page } from "../fixtures";
/**
 * @exports default methods used in all tests
 */
export class BasePage {
    async pauseInSec(sec: number) {
        await page.waitForTimeout(sec * 1000);
    }
    async open(url: string) {
        await page.goto(url);
    }
    async checkUrl(url: string) {
        expect(page.url()).toContain(url);
    }
    async goBack() {
        await page.goBack();
    }
    async checkRedirectionToNewTab(selector: string, url: string) {
        const newPagePromise = page.waitForEvent("popup");
        await this.click(selector);
        const newPage = await newPagePromise;
        expect(newPage.url()).toContain(url);
        await newPage.close();
    }
    async clickAnyWhereToClose() {
        await page.mouse.click(1000, 1000);
    }
    async click(selector: string) {
        await page.waitForLoadState();
        await page.getByTestId(selector).click();
    }
    async clickFirst(selector: string) {
        await page.waitForLoadState();
        await page.getByTestId(selector).first().click();
    }
    async clickSecond(selector: string) {
        await page.waitForLoadState();
        await page.getByTestId(selector).nth(1).click();
    }
    async hoverElement(selector: string) {
        await page.getByTestId(selector).hover();
    }
    async isVisible(selector: string) {
        await expect(page.getByTestId(selector)).toBeVisible();
    }
    async isNotVisible(selector: string) {
        await expect(page.getByTestId(selector)).not.toBeVisible();
    }
    async enterText(selector: string, text: string) {
        await page.getByTestId(selector).fill(text);
    }
    async compareText(selector: string, text: string, index: number) {
        await expect(page.getByTestId(selector).nth(index)).toHaveText(text);
    }
    async containsText(selector: string, text: string) {
        await expect(page.getByTestId(selector)).toContainText(text);
    }
    async compareValue(selector: string, text: string) {
        await expect(page.getByTestId(selector)).toHaveValue(text);
    }
    async compareNotValue(selector: string, text: string) {
        await expect(page.getByTestId(selector)).not.toHaveValue(text);
    }
    async getAllElements(selector: string) {
        await page.waitForSelector(selector);
        return page.getByTestId(selector).all();
    }
}

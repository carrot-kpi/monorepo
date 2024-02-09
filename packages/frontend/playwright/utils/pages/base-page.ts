import { expect, Page } from "@playwright/test";
/**
 * @exports default methods used in all tests
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async pauseInSec(sec: number) {
        await this.page.waitForTimeout(sec * 1000);
    }
    async open(url: string) {
        await this.page.goto(url);
    }
    async checkUrl(url: string) {
        expect(this.page.url()).toContain(url);
    }
    async goBack() {
        await this.page.goBack();
    }
    async checkRedirectionToNewTab(selector: string, url: string) {
        const newPagePromise = this.page.waitForEvent("popup");
        await this.click(selector);
        const newPage = await newPagePromise;
        expect(newPage.url()).toContain(url);
        await newPage.close();
    }
    async clickAnyWhereToClose() {
        await this.page.mouse.click(1000, 1000);
    }
    async click(selector: string, index?: number) {
        await (index !== undefined
            ? this.page.getByTestId(selector).nth(index).click()
            : this.page.getByTestId(selector).click());
    }
    async hoverElement(selector: string) {
        await this.page.getByTestId(selector).hover();
    }
    async isVisible(selector: string) {
        await expect(this.page.getByTestId(selector)).toBeVisible();
    }
    async elementVisible(selector: string, index?: number) {
        await (index !== undefined
            ? expect(this.page.locator(selector).nth(index)).toBeVisible()
            : expect(this.page.locator(selector).first()).toBeVisible());
    }
    async isNotVisible(selector: string) {
        await expect(this.page.getByTestId(selector)).not.toBeVisible();
    }
    async enterText(selector: string, text: string) {
        await this.page.getByTestId(selector).fill(text);
    }
    async compareText(selector: string, text: string, index?: number) {
        await (index !== undefined
            ? expect(this.page.getByTestId(selector).nth(index)).toHaveText(
                  text,
              )
            : expect(this.page.getByTestId(selector).first()).toHaveText(text));
    }
    async containsText(selector: string, text: string) {
        await expect(this.page.getByTestId(selector)).toContainText(text);
    }
    async compareValue(selector: string, text: string) {
        await expect(this.page.getByTestId(selector)).toHaveValue(text);
    }
    async compareNotValue(selector: string, text: string) {
        await expect(this.page.getByTestId(selector)).not.toHaveValue(text);
    }
    async getAllElements(selector: string) {
        await this.page.waitForSelector(selector);
        return this.page.getByTestId(selector).all();
    }
}

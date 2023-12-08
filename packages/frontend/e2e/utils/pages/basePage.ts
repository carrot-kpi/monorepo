/* eslint-disable @typescript-eslint/no-explicit-any */
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
    async checkUrl(page: Page, url: string) {
        expect(page.url()).toContain(url);
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
    async click(selector: string) {
        await this.page.waitForLoadState();
        await this.page.getByTestId(selector).click();
    }
    async clickFirst(selector: string) {
        await this.page.waitForLoadState();
        await this.page.getByTestId(selector).first().click();
    }
    async clickSecond(selector: string) {
        await this.page.waitForLoadState();
        await this.page.getByTestId(selector).nth(1).click();
    }
    async hoverElement(selector: string) {
        await this.page.getByTestId(selector).hover();
    }
    async isVisible(selector: string) {
        await expect(this.page.getByTestId(selector)).toBeVisible();
    }
    async isNotVisible(selector: string) {
        await expect(this.page.getByTestId(selector)).not.toBeVisible();
    }
    async storeText(selector: string) {
        return await this.page.locator(selector).first().innerText();
    }
    async enterText(selector: string, text: string) {
        await this.page.getByTestId(selector).fill(text);
    }
    async compareText(selector: string, text: string, index: number) {
        await expect(this.page.getByTestId(selector).nth(index)).toHaveText(
            text,
        );
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

import {
    test as base,
    expect,
    chromium,
    Page,
    BrowserContext,
} from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { metamaskData } from "./data";
import * as metamask from "./metamask/metamask";
import path from "path";

const metamaskVersion = "metamask-chrome-11.6.3";
const pathToExtension = path.join(__dirname, `/metamask/${metamaskVersion}`);

/**
 * @implements before & after hooks for independent tests
 * @exports instances of the classes required in the tests
 */
let page: Page;
let context: BrowserContext;

export const test = base.extend<{
    context: BrowserContext;
    homePage: HomePage;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    context: async ({}, use) => {
        await metamask.unzipMetamask(pathToExtension);
        // Launch new browser instance
        context = await chromium.launchPersistentContext("", {
            headless: true,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                "--disable-gpu",
                "--headless=new",
            ],
            viewport: { width: 1920, height: 1040 },
        });
        await context.pages()[0].waitForTimeout(10000);
        const allPages = context.pages();
        // Get Metamask id
        metamaskData.metamaskID = allPages[1].url().split("/")[2];
        await allPages[1].close();
        // Open new tab
        page = await context.newPage();
        // Import wallet
        await metamask.importMetamaskWallet(
            metamaskData.mnemonic,
            metamaskData.metamaskPassword,
        );
        // Select network
        await metamask.chooseMetamaskNetwork(metamaskData.coston2Network);
        await use(context);

        await context.close();
    },
});

export { page, context, expect };

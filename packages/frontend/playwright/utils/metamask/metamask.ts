import unzipper from "unzipper";
import fs from "fs";
import { page, context } from "../fixtures";
import { metamaskData } from "../data";

export async function unzipMetamask(pathToExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.createReadStream(`${pathToExtension}.zip`)
            .pipe(unzipper.Extract({ path: pathToExtension }))
            .on("close", resolve)
            .on("error", reject);
    });
}

export async function importMetamaskWallet(mnemonic: any, password: any) {
    await page.goto(`chrome-extension://${metamaskData.metamaskID}/home.html`);
    await page.getByTestId("onboarding-terms-checkbox").click();
    await page.getByTestId("onboarding-import-wallet").click();
    await page.getByTestId("metametrics-i-agree").click();
    // Enter mnemonic
    for (let i = 0; i < mnemonic.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await page.locator(`#import-srp__srp-word-${i}`).fill(mnemonic[i]);
    }
    await page.getByTestId("import-srp-confirm").click();
    // Enter password
    await page.getByTestId("create-password-new").fill(password);
    await page.getByTestId("create-password-confirm").fill(password);
    await page.getByTestId("create-password-terms").click();
    await page.getByTestId("create-password-import").click();
    // Click next
    await page.getByTestId("onboarding-complete-done").click();
    await page.getByTestId("pin-extension-next").click();
    await page.getByTestId("pin-extension-done").click();
    // Close modal
    await page.getByTestId("popover-close").click();
}

export async function chooseMetamaskNetwork(network: any) {
    await page.goto(`chrome-extension://${metamaskData.metamaskID}/home.html`);
    // Close modal
    await page.getByTestId("popover-close").click();
    // Click network display
    await page.getByTestId("network-display").click();
    await page
        .locator('//label[@class="toggle-button toggle-button--off"]')
        .click();
    // Add network
    await page.getByText("Add network").click();
    await page.locator('//h6[text()="Add a network manually"]').click();
    for (let i = 0; i < network.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await page
            .locator(`(//input[@class="form-field__input"])[${i + 1}]`)
            .fill(network[i]);
    }
    await page.locator('//button[text()="Save"]').click();
    // Switch to new network
    await page.locator('//h6[contains(text(),"Switch to ")]').click();
}

export async function signMetamaskTransaction() {
    // Open Metamask extension in new tab
    const pageTwo = await context.newPage();
    await pageTwo.goto(
        `chrome-extension://${metamaskData.metamaskID}/home.html`,
    );
    // Connect with MetaMask
    await pageTwo.getByTestId("page-container-footer-next").click();
    // Connect to Account
    await pageTwo.getByTestId("page-container-footer-next").click();
    // Close tab
    await pageTwo.close();
}

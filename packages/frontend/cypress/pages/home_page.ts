import { BasePage } from "./base_page";
import * as selectors from "../utils/selectors";
import { textData } from "cypress/utils/data";
/**
 * @exports default methods used in all tests
 */
export class HomePage extends BasePage {
    goBack() {
        cy.go("back");
    }
    //---Clicks
    clickConnectWallet() {
        this.click(selectors.walletMenu.connectWalletButton, 1);
    }
    //---Assertions
    checkStagingBanner() {
        this.compareText(
            selectors.header.stagingBanner_Text,
            textData.stagingBannerText,
        );
    }
}

const homePage = new HomePage();
export { homePage };

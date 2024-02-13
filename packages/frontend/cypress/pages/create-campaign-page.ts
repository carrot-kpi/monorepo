import { BasePage } from "./base-page";
import * as selectors from "../utils/selectors";
import { urls, textData } from "../utils/data";
/**
 * @exports default methods used in all tests
 */
export class CreateCampaign extends BasePage {
    //---Assertions
    checkCreateCampaignUrl() {
        this.checkUrl(urls.createCampaign);
    }
    checkWalletDisconnectedText() {
        this.compareText(
            selectors.disconnectedWallet.walletDisconnected_Text,
            textData.walletDisconnected,
        );
        this.compareText(
            selectors.disconnectedWallet.walletRequiredDescription_Text,
            textData.walletRequiredDescription,
        );
    }
    // todo: this should be refactored once we have IDs on FE
    checkWelcomeToCarrotModal() {
        cy.get("p")
            .contains("Welcome to Carrot")
            .should(($el) => {
                const text = $el.text().trim();
                expect(text).to.equal(textData.welcomeToCarrot);
            });
        cy.get("p")
            .contains("In order to create campaigns")
            .should(($el) => {
                const text = $el.text().trim();
                expect(text).to.equal(textData.authenticateDescription);
            });
    }
}
const createCampaign = new CreateCampaign();
export { createCampaign };

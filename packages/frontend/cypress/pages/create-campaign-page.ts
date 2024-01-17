import { BasePage } from "./base-page";
import * as selectors from "../utils/selectors";
import { urls, textData } from "utils/data";
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
}
const createCampaign = new CreateCampaign();
export { createCampaign };

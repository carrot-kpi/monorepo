import { BasePage } from "../pages/basePage";
import { campaignData, textData } from "../data";
/**
 * @exports Selectors and Methods for Home page
 */

export class createCampaign extends BasePage {
    //---Selectors
    welcomeToCarrot_Text = "welcome-to-carrot-title-text";
    createCampaignAuthParagraph_Text = "authenticate-description-text";
    cancel_Button = "authenticate-cancel-button";
    signMessage_Button = "authenticate-sign-button";
    campaingTitle_Field = "generic-data-step-title-input";
    campaignDescription_Field = "#:rt:";
    campaignTags_Field = "";
    addTag_Button = "";
    expirationDate_Field = "generic-data-step-expiration-input";
    generalNext_Button = "generic-data-step-next-button";
    tokenName_Field = "rewards-step-token-name-input";
    tokenSymbol_Field = "rewards-step-token-symbol-input";
    tokenSupply_Field = "rewards-step-token-supply-input";
    rewardPicker_Button = "rewards-step-open-rewards-picker-button";
    tokenSearch_Field = "#token-search";
    minimumPayout_Switch = "rewards-step-minimum-payout-switch";
    addToCampaign_Button = "rewards-step-add-reward-button";
    rewardsNext_Button = "rewards-step-next-button";
    oracleNext_Button = "";
    deployCampaign_Button = "";
    //---Methods
    async checkAuthenticateModalText() {
        await this.compareText(
            this.welcomeToCarrot_Text,
            textData.welcomeToCarrot,
            0,
        );
        await this.compareText(
            this.createCampaignAuthParagraph_Text,
            textData.authenticateDescription,
            0,
        );
    }
    async clickSign() {
        await this.click(this.signMessage_Button);
    }
    async enterCampaingTitle() {
        await this.enterText(this.campaingTitle_Field, campaignData.title);
    }
    async enterCampaingDescription() {
        await this.enterText(
            this.campaignDescription_Field,
            campaignData.description,
        );
    }
    async enterCampaingTag() {
        await this.enterText(this.campaignTags_Field, campaignData.description);
        await this.click(this.addTag_Button);
    }
    async enterExpiryDate() {
        await this.enterText(
            this.expirationDate_Field,
            campaignData.expiryDate,
        );
    }
    async clickStep(step: string) {
        switch (step) {
            case "general":
                this.click(this.generalNext_Button);
                break;
            case "rewards":
                this.click(this.rewardsNext_Button);
                break;
            case "oracle":
                this.click(this.generalNext_Button);
                break;
            case "deploy":
                this.click(this.generalNext_Button);
                break;
        }
    }
}

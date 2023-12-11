import { BasePage } from "./basePage";
import {
    confirmSignatureRequest,
    confirmPermissionToApproveAll,
} from "@synthetixio/synpress/commands/metamask";
import { campaignData, textData } from "../data";
/**
 * @exports Selectors and Methods for create Campaign stepper
 */

export class CreateCampaign extends BasePage {
    //---Selectors
    welcomeToCarrot_Text = "welcome-to-carrot-title-text";
    createCampaignAuthParagraph_Text = "authenticate-description-text";
    cancel_Button = "authenticate-cancel-button";
    signMessage_Button = "authenticate-sign-button";
    campaingTitle_Field = "generic-data-step-title-input";
    campaignDescription_Field = "#:rt:";
    campaignTags_Field = "generic-data-step-tags-input";
    addTag_Button =
        "#carrot-template-26833f329b2f1da18c9ce2a9c000ee9c button > div";
    generalNext_Button = "generic-data-step-next-button";
    tokenName_Field = "rewards-step-token-name-input";
    tokenSymbol_Field = "rewards-step-token-symbol-input";
    tokenSupply_Field = "rewards-step-token-supply-input";
    rewardPicker_Button = "rewards-step-open-rewards-picker-button";
    manageList_Button = "";
    carrotLabsDefault_Button = "";
    aaaToken_Button = "";
    tokenSearch_Field = "#token-search";
    rewardAmount_Field = "rewards-step-reward-amount-input";
    minimumPayout_Switch = "rewards-step-minimum-payout-switch";
    addToCampaign_Button = "rewards-step-add-reward-button";
    rewardsNext_Button = "rewards-step-next-button";
    metricDropdown_Button = "creation-form-metric-select-input";
    totalValueLocked_Option = "";
    expirationDate_Field = "creation-form-measurement-date-input";
    protocolDropdown_Button = "payload-form-protocol-select-input";
    lido_Option = "";
    greaterThan_Button = "creation-form-constraint-3";
    goalValue_Field = "single-value-form-value0-input";
    oracleNext_Button = "oracles-configuration-step-next-button";
    approve_Button = "approve-reward";
    deployYourCampaign_Button = "deploy-step-create-button";
    goToCampaign_Button = "";
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
    async confirmSignatureOnMetamask() {
        await confirmSignatureRequest();
    }
    async approveTokenOnMetamask() {
        await confirmPermissionToApproveAll();
    }
    // Clicks
    async clickSign() {
        await this.click(this.signMessage_Button);
    }
    async clickNextOnStep(step: string) {
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
    async clickAddToCampaign() {
        await this.click(this.addToCampaign_Button);
    }
    async clickApprove() {
        await this.click(this.approve_Button);
    }
    async clickDeployYourCampaign() {
        await this.click(this.deployYourCampaign_Button);
    }
    async clickGoToCampaign() {
        await this.click(this.goToCampaign_Button);
    }
    // General step
    async enterTitle() {
        await this.enterText(this.campaingTitle_Field, campaignData.title);
    }
    async enterDescription() {
        await this.enterText(
            this.campaignDescription_Field,
            campaignData.description,
        );
    }
    async enterTag() {
        await this.enterText(this.campaignTags_Field, campaignData.description);
        await this.clickFirst(this.addTag_Button);
    }
    async enterExpiryDate() {
        await this.click(this.expirationDate_Field);
        // todo: figure out how to enter date
    }
    async enterGeneralData() {
        await this.enterTitle();
        await this.enterDescription();
        await this.enterTag();
    }
    // Rewards step
    async enterTokenName() {
        await this.enterText(this.tokenName_Field, campaignData.tokenName);
    }
    async enterTokenSymbol() {
        await this.enterText(this.tokenSymbol_Field, campaignData.tokenSymbol);
    }
    async enterTokenSupply() {
        await this.enterText(this.tokenSupply_Field, campaignData.tokenSupply);
    }
    // ATM carrot labs default; todo: improve to be able to select any token
    async pickRewardToken() {
        await this.click(this.rewardPicker_Button);
        await this.click(this.manageList_Button);
        await this.click(this.carrotLabsDefault_Button);
        await this.click(this.aaaToken_Button);
    }
    async enterRewardAmount() {
        await this.enterText(
            this.rewardAmount_Field,
            campaignData.rewardAmount,
        );
    }
    async enterRewardsData() {
        await this.enterTokenName();
        await this.enterTokenSymbol();
        await this.enterTokenSupply();
        await this.pickRewardToken();
        await this.enterRewardAmount();
    }
    // Oracle step
    async selectTotalValueLockedMetric() {
        await this.click(this.metricDropdown_Button);
        await this.click(this.totalValueLocked_Option);
    }
    async selectProtocol() {
        await this.click(this.protocolDropdown_Button);
        await this.click(this.lido_Option);
    }
    // todo: improve to be able to select any goal
    async selectGoal() {
        await this.click(this.greaterThan_Button);
    }
    async enterGoalValue() {
        await this.enterText(this.goalValue_Field, campaignData.goalValue);
    }
    async enterOracleData() {
        await this.selectTotalValueLockedMetric();
        await this.enterExpiryDate();
        await this.selectProtocol();
        await this.selectGoal();
        await this.enterGoalValue();
    }
}

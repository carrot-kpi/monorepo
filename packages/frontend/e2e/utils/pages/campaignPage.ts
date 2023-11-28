import { BasePage } from "./basePage";
/**
 * @exports Selectors and Methods for single Campaign page
 */

export class CampaignPage extends BasePage {
    //---Selectors
    campaignTitle_Text = "";
    //---Methods
    async checkCampaignTitle(title: string) {
        await this.compareText(this.campaignTitle_Text, title, 0);
    }
}

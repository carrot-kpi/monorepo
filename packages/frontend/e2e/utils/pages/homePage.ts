/*
  home_page.ts
  Selectors and Methods for Home page 
*/
import { BasePage } from "../pages/basePage";
import { textData, urls } from "../data/data";

export class HomePage extends BasePage {
    // ---Selectors
    stagingBanner_Text = "staging-banner-text";
    about_button = "header-About-button";
    campaigns_button = "header-Campaigns-button";
    // ---Methods
    async goToHomePage() {
        await this.open("/");
    }
    async goBack() {
        await this.page.goBack();
    }
    async checkStagingBanner() {
        await this.compareText(
            this.stagingBanner_Text,
            textData.stagingBannerText,
        );
    }
    async clickAbout() {
        await this.click(this.about_button);
    }
    async checkAboutButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.about_button,
            urls.carrotCommunity,
        );
    }
    async goToAllCampaignsFromHeader() {
        await this.click(this.campaigns_button);
    }
    async checkIfOnAllCampaignsPage() {
        await this.checkUrl(this.page, urls.allCampaigns);
    }
}

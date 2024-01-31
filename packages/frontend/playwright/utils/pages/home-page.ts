import { BasePage } from "../pages/base-page";
import {
    campaignData,
    urls,
    networks,
    templateData,
    textData,
    wallets,
} from "../data";
/**
 * @exports Selectors and Methods for Home page
 */
export class HomePage extends BasePage {
    // ---Selectors
    stagingBanner_Text = "staging-banner-text";
    campaignsHeader_Button = "header-Campaigns-button";
    networkDropdown_Button = "network-drop-down-button";
    selectedPolygonMumbain_Icon = "80001-icon";
    selectedScrollSepoliaNetwork_Icon = "534351-icon";
    selectedSepoliaNetwork_Icon = "11155111-icon";
    polygonMumbaiNetwork_Option = "80001-network-button";
    scrollSepoliaNetwork_Option = "534351-network-button";
    sepoliaNetwork_Option = "11155111-network-button";
    connectWallet_Button = "connect-wallet-button";
    injectedMetamask_Button = "injected-wallet-button";
    metamask_Button = "metaMask-wallet-button";
    coinBase_Button = "coinbaseWallet-wallet-button";
    settings_Button = "settings-button";
    decentralizationMode_Text = "decentralization-mode-text";
    decentralizationMode_Switch = "decentralization-mode-switch";
    stagingMode_Text = "staging-mode-text";
    stagingMode_Switch = "staging-mode-switch";
    heroTitle_Text = "hero-section-title-text";
    heroDescription_Text = "hero-section-description-text";
    howItWorks_Button = "how-it-works-button";
    howItWorksVideo_Preview = "video-preview-overlay";
    createCampaign_Button = "create-campaign-button";
    latestCampaign_Text = "latest-campaigns-title-text";
    viewCampaign_Button = "view-campaign-button";
    viewAllCampaigns_Button = "view-all-campaigns-button";
    firstCampaignTitle_Text = "TS01 NOV13-campaign-title";
    templates_Text = "templates-title-text";
    templateErc20KPIToken_Text = "ERC20 KPI token-template-title";
    useTemplate_Button = "use-template-button";
    footerAbout_Text = "footer-About-text";
    footerCommunity_Text = "footer-Community-text";
    footerDocumentation_Link = "footer-Documentation-button";
    footerAudits_Link = "footer-Audits-button";
    footerDiscord_Link = "footer-Discord-button";
    footerTwitter_Link = "footer-Twitter-button";
    footerCarrotInfoPage_Button = "footer-carrot-info-page-button";
    power_Button = "disconnect-button";
    // todo: add ID instead, when we have it on FE
    profileAvatar_Button = ".rounded-full";
    emptySpace_Text = "empty-title-text";
    noDataFound_Text = "empty-no-data-found-text";
    // selectors on campaign page
    walletDisconnected_Text = "wallet-disconnected-text";
    walletRequiredDescription_Text = "connect-wallet-required-text";
    // ---Methods
    async goToHomePage() {
        await this.page.goto("/");
    }
    async checkStagingBanner() {
        await this.compareText(
            this.stagingBanner_Text,
            textData.stagingBannerText,
        );
    }
    //---Clicks
    async clickCampaignsHeader() {
        await this.click(this.campaignsHeader_Button);
    }
    async clickNetwork() {
        this.click(this.networkDropdown_Button);
    }
    async clickConnectWallet() {
        await this.click(this.connectWallet_Button);
    }
    async clickSettings() {
        await this.click(this.settings_Button);
    }
    async clickCreateCampaign() {
        await this.click(this.createCampaign_Button);
    }
    async clickHowItWorks() {
        await this.click(this.howItWorks_Button);
    }
    async clickViewAllCampaigns() {
        await this.click(this.viewAllCampaigns_Button);
    }
    async clickProfileAvatar() {
        await this.click(this.profileAvatar_Button);
    }
    async clickPowerButton() {
        await this.click(this.power_Button);
    }
    //--- Header assertions
    // todo: this should be in separate page regarding all campaigns
    async checkIfOnAllCampaignsPage() {
        await this.checkUrl(urls.allCampaigns);
    }
    async checkNetworkOptions() {
        await this.clickNetwork();
        await this.compareText(
            this.scrollSepoliaNetwork_Option,
            networks.scrollSepolia,
        );
        await this.compareText(this.sepoliaNetwork_Option, networks.sepolia);
    }
    // selects networks from network dropdown and checks if it's been selected
    async selectNetwork(network: string) {
        await this.clickNetwork();
        switch (network) {
            case networks.polygonMumbai:
                await this.click(this.polygonMumbaiNetwork_Option);
                break;
            case networks.scrollSepolia:
                await this.click(this.scrollSepoliaNetwork_Option);
                break;
            case networks.sepolia:
                await this.click(this.sepoliaNetwork_Option);
                break;
        }
    }
    async checkSelectedNetwork(network: string) {
        switch (network) {
            case networks.polygonMumbai:
                await this.isVisible(this.selectedPolygonMumbain_Icon);
                break;
            case networks.scrollSepolia:
                await this.isVisible(this.selectedScrollSepoliaNetwork_Icon);
                break;
            case networks.sepolia:
                await this.isVisible(this.selectedSepoliaNetwork_Icon);
                break;
        }
    }
    async checkWalletOptions() {
        await this.clickConnectWallet();
        await this.compareText(
            this.injectedMetamask_Button,
            wallets.injectedMetamask,
        );
        await this.compareText(this.metamask_Button, wallets.metamask);
        await this.compareText(this.coinBase_Button, wallets.coinBase);
    }
    async selectWalletConnection(wallet: string) {
        await this.clickConnectWallet();
        switch (wallet) {
            case wallets.injectedMetamask:
                await this.click(this.injectedMetamask_Button);
                break;
            case wallets.metamask:
                await this.click(this.metamask_Button);
                break;
            case wallets.coinBase:
                await this.click(this.coinBase_Button);
                break;
        }
    }
    async checkSettings() {
        await this.clickSettings();
        await this.compareText(
            this.decentralizationMode_Text,
            textData.decentralizationMode,
        );
        await this.compareText(this.stagingMode_Text, textData.stagingMode);
    }
    //---Page assertions
    async checkTextOnHomePage() {
        await this.compareText(this.heroTitle_Text, textData.heroSectionTitle);
        await this.compareText(
            this.heroDescription_Text,
            textData.heroSectionDescription,
        );
        await this.compareText(
            this.latestCampaign_Text,
            textData.latestCampaigns,
        );
        await this.compareText(this.templates_Text, textData.templatest);
        await this.compareText(this.footerAbout_Text, textData.footerAbout);
        await this.compareText(
            this.footerCommunity_Text,
            textData.footerCommunity,
        );
    }
    // todo: this method should be on create campaign page
    async checkCreateCampaignButtonRedirection() {
        await this.clickCreateCampaign();
        await this.checkUrl(urls.createCampaign);
    }
    async checkHowItWorksPreview() {
        await this.clickHowItWorks();
        await this.isVisible(this.howItWorksVideo_Preview);
        await this.clickAnyWhereToClose();
    }
    // todo: this method should be on create campaign page
    async checkWalletDisconnectedText() {
        await this.compareText(
            this.walletDisconnected_Text,
            textData.walletDisconnected,
        );
        await this.compareText(
            this.walletRequiredDescription_Text,
            textData.walletRequiredDescription,
        );
    }
    // Gets number of active campaigns; selects one randomly; stores its title; check redirection to selected campaign page
    async checkActiveCampaign() {
        const elements = await this.page.$$('[data-testid*="campaign-title"]');
        // Check if there's at least one element
        if (elements.length > 0) {
            const randomIndex = Math.floor(Math.random() * elements.length);
            const randomElement = elements[randomIndex];
            const textContent = await randomElement.textContent();
            console.log(`Selected active campaign: ${textContent}`);

            // Put title into variable
            campaignData.title =
                typeof textContent === "string" ? textContent : "";
            // Check redirection to selected campaign page
            await this.page
                .getByTestId("view-campaign-button")
                .nth(randomIndex)
                .click();
            // todo: add assertion of title when redirected to campaigns page when we have selector
        } else {
            console.log("No active campaigns.");
        }
    }
    async checkFirstTemplate() {
        await this.compareText(
            this.templateErc20KPIToken_Text,
            templateData.erc20Title,
        );
    }
    async checkRedirectionToFirstTemplate() {
        await this.click(this.useTemplate_Button);
        await this.checkUrl(urls.createCampaign);
    }
    async checkFooterRedirections() {
        const footerLinks = [
            this.footerDocumentation_Link,
            this.footerAudits_Link,
            this.footerDiscord_Link,
            this.footerTwitter_Link,
            this.footerCarrotInfoPage_Button,
        ];

        const footerUrls = [
            urls.documentation,
            urls.audits,
            urls.discord,
            urls.twitter,
            urls.carrotInfoPage,
        ];

        for (let i = 0; i < footerLinks.length; i++) {
            const link = footerLinks[i];
            const url = footerUrls[i];

            await this.checkRedirectionToNewTab(link, url);
        }
    }
    async profileAvatarVisible() {
        this.elementVisible(this.profileAvatar_Button);
    }
    async checkProfileWithoutRecentActivity() {
        this.compareText(this.emptySpace_Text, textData.noTransactions);
        // todo: change this once we have IDs on FE
        await this.page.locator(this.profileAvatar_Button).click();
        await this.page.getByText("DRAFT").click();
        this.compareText(this.emptySpace_Text, textData.noDraftSaved);
        this.compareText(this.noDataFound_Text, textData.trySavingNewDraft);
    }
    async logout() {
        // todo: change method when we have ID on FE
        await this.page.locator(this.profileAvatar_Button).click();
        await this.clickPowerButton();
    }
}

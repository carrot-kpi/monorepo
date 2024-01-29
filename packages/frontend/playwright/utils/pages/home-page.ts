import { BasePage } from "./base-page";
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
    about_Button = "header-About-button";
    campaignsHeader_Button = "header-Campaigns-button";
    networkDropdown_Button = "network-drop-down-button";
    selectedPolygonMumbain_Text = "Polygon Mumbai-button";
    selectedScrollSepoliaNetwork_Text = "Scroll Sepolia-button";
    selectedSepoliaNetwork_Text = "Sepolia-button";
    polygonMumbaiNetwork_Text = "Polygon Mumbai-network-button";
    scrollSepoliaNetwork_Text = "Scroll Sepolia-network-button";
    sepoliaNetwork_Text = "Sepolia-network-button";
    connectWallet_Button = "connect-wallet-button";
    injectedMetamask_Button = "injected-wallet-button";
    metamask_Button = "metaMask-wallet-button";
    coinBase_Button = "coinbaseWallet-wallet-button";
    settings_Button = "settings-button";
    interfaceSettingsTitle_Text = "interface-settings-title";
    darkTheme_Text = "theme-name-text";
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
    footerDiscrod_Link = "footer-Discord-button";
    footerTwitter_Link = "footer-Twitter-button";
    footerCarrotInfoPage_Button = "footer-carrot-info-page-button";
    // selectors on campaign page
    walletDisconnected_Text = "wallet-disconnected-text";
    walletRequiredDescription_Text = "connect-wallet-required-text";
    // ---Methods
    async goToHomePage() {
        await this.open("/");
    }
    async checkStagingBanner() {
        await this.compareText(
            this.stagingBanner_Text,
            textData.stagingBannerText,
            0,
        );
    }
    //---Clicks
    async clickAbout() {
        await this.click(this.about_Button);
    }
    async clickCampaignsHeader() {
        await this.click(this.campaignsHeader_Button);
    }
    async clickNetwork() {
        this.clickSecond(this.networkDropdown_Button);
    }
    async clickConnectWallet() {
        await this.clickSecond(this.connectWallet_Button);
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
    //--- Header assertions
    async checkAboutButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.about_Button,
            urls.carrotCommunity,
        );
    }
    async checkIfOnAllCampaignsPage() {
        await this.checkUrl(urls.allCampaigns);
    }
    async checkNetworkOptions() {
        await this.clickNetwork();
        await this.compareText(
            this.scrollSepoliaNetwork_Text,
            networks.scrollSepolia,
            1,
        );
        await this.compareText(this.sepoliaNetwork_Text, networks.sepolia, 1);
    }
    // selects networks from network dropdown and checks if it's been selected
    async selectNetwork(network: string) {
        await this.clickNetwork();
        switch (network) {
            case networks.polygonMumbai:
                await this.clickSecond(this.polygonMumbaiNetwork_Text);
                break;
            case networks.scrollSepolia:
                await this.clickSecond(this.scrollSepoliaNetwork_Text);
                break;
            case networks.sepolia:
                await this.clickSecond(this.sepoliaNetwork_Text);
                break;
        }
    }
    async checkSelectedNetwork(network: string) {
        switch (network) {
            case networks.polygonMumbai:
                await this.compareText(
                    this.selectedPolygonMumbain_Text,
                    networks.polygonMumbai,
                    1,
                );
                break;
            case networks.scrollSepolia:
                await this.compareText(
                    this.selectedScrollSepoliaNetwork_Text,
                    networks.scrollSepolia,
                    1,
                );
                break;
            case networks.sepolia:
                await this.compareText(
                    this.selectedSepoliaNetwork_Text,
                    networks.sepolia,
                    1,
                );
                break;
        }
    }
    async checkWalletOptions() {
        await this.clickConnectWallet();
        await this.compareText(
            this.injectedMetamask_Button,
            wallets.injectedMetamask,
            1,
        );
        await this.compareText(this.metamask_Button, wallets.metamask, 1);
        await this.compareText(this.coinBase_Button, wallets.coinBase, 1);
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
    async checkSettingsDropdown() {
        await this.clickSettings();
        await this.compareText(
            this.interfaceSettingsTitle_Text,
            textData.interfaceSettings,
            0,
        );
        await this.compareText(this.darkTheme_Text, textData.darkTheme, 0);
        await this.compareText(
            this.decentralizationMode_Text,
            textData.decentralizationMode,
            0,
        );
        await this.compareText(this.stagingMode_Text, textData.stagingMode, 0);
    }
    //---Page assertions
    async checkTextOnHomePage() {
        await this.compareText(
            this.heroTitle_Text,
            textData.heroSectionTitle,
            0,
        );
        await this.compareText(
            this.heroDescription_Text,
            textData.heroSectionDescription,
            0,
        );
        await this.compareText(
            this.latestCampaign_Text,
            textData.latestCampaigns,
            0,
        );
        await this.compareText(this.templates_Text, textData.templatest, 0);
        await this.compareText(this.footerAbout_Text, textData.footerAbout, 0);
        await this.compareText(
            this.footerCommunity_Text,
            textData.footerCommunity,
            0,
        );
    }
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
            0,
        );
        await this.compareText(
            this.walletRequiredDescription_Text,
            textData.walletRequiredDescription,
            0,
        );
    }
    async checkFirstCampaign() {
        await this.compareText(
            this.firstCampaignTitle_Text,
            campaignData.firstCampaign,
            0,
        );
    }
    async checkRedirectionToFirstCampaign() {
        await this.clickFirst(this.viewCampaign_Button);
        await this.checkUrl("campaigns/");
    }
    async checkFirstTemplate() {
        await this.compareText(
            this.templateErc20KPIToken_Text,
            templateData.erc20Title,
            0,
        );
    }
    async checkRedirectionToFirstTemplate() {
        await this.click(this.useTemplate_Button);
        await this.checkUrl(urls.createCampaign);
    }
    async checkFooterDocumentationButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.footerDocumentation_Link,
            urls.documentation,
        );
    }
    async checkFooterAuditsButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.footerAudits_Link,
            urls.audits,
        );
    }
    async checkFooterDiscordButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.footerDiscrod_Link,
            urls.discord,
        );
    }
    async checkFooterTwitterButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.footerTwitter_Link,
            urls.twitter,
        );
    }
    async checkFooterCarrotInfoPageButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.footerCarrotInfoPage_Button,
            urls.carrotInfoPage,
        );
    }
}

import { BasePage } from "../pages/basePage";
import { networks, textData, urls, wallets } from "../data/data";
/**
 * @exports Selectors and Methods for Home page
 */
export class HomePage extends BasePage {
    // ---Selectors
    stagingBanner_Text = "staging-banner-text";
    about_Button = "header-About-button";
    campaigns_Button = "header-Campaigns-button";
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
            0,
        );
    }
    //---Clicks
    async clickAbout() {
        await this.click(this.about_Button);
    }
    async clickCampaignsHeader() {
        await this.click(this.campaigns_Button);
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
    //---Assertions
    async checkAboutButtonRedirection() {
        await this.checkRedirectionToNewTab(
            this.about_Button,
            urls.carrotCommunity,
        );
    }
    async checkIfOnAllCampaignsPage() {
        await this.checkUrl(this.page, urls.allCampaigns);
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
}

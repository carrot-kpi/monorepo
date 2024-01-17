import { BasePage } from "./base-page";
import * as selectors from "../utils/selectors";
import {
    textData,
    urls,
    networks,
    wallets,
    campaignData,
    templateData,
} from "utils/data";
/**
 * @exports default methods used in all tests
 */
export class HomePage extends BasePage {
    goBack() {
        cy.go("back");
    }
    //---Clicks
    clickCampaignsHeader() {
        this.click(selectors.header.campaignsHeader_Button);
    }
    clickNetwork() {
        this.click(selectors.networkMenu.networkDropdown_Button, 1);
    }
    clickConnectWallet() {
        this.click(selectors.walletMenu.connectWallet_Button, 1);
    }
    clickSettings() {
        this.click(selectors.settings.settings_Button);
    }
    clickHowItWorks() {
        this.click(selectors.heroSection.howItWorks_Button);
    }
    clickViewAllCampaigns() {
        this.click(selectors.campaignsSection.viewAllCampaigns_Button);
    }
    clickCreateCampaign() {
        this.click(selectors.heroSection.createCampaign_Button);
    }
    clickProfileAvatar() {
        this.click(selectors.header.profileAvatar_Button, 1);
    }
    clickPowerButton() {
        this.click(selectors.header.power_Button, 1);
    }
    //---Assertions
    connectWalletButtonVisible(visible: boolean) {
        visible
            ? this.elementIsVisible(selectors.walletMenu.connectWallet_Button)
            : this.elementNotExist(selectors.walletMenu.connectWallet_Button);
    }
    profileAvatarVisible(visible: boolean) {
        visible
            ? this.elementIsVisible(selectors.header.profileAvatar_Button, 1)
            : this.elementNotExist(selectors.header.profileAvatar_Button);
    }
    checkStagingBanner() {
        this.compareText(
            selectors.header.stagingBanner_Text,
            textData.stagingBannerText,
        );
    }
    // todo: this should be in separate page regarding all campaigns
    checkIfOnAllCampaignsPage() {
        this.checkUrl(urls.allCampaigns);
        this.compareText(
            selectors.allCampaigns.allCampaignsTitle_Text,
            textData.allCampaignsTitle,
        );
    }
    checkNetworkOptions() {
        this.clickNetwork();
        this.compareText(
            selectors.networkMenu.scrollSepoliaNetwork_Option,
            networks.scrollSepolia,
            1,
        );
        this.compareText(
            selectors.networkMenu.sepoliaNetwork_Option,
            networks.sepolia,
            1,
        );
    }
    checkSelectedNetwork(network: string) {
        switch (network) {
            case networks.polygonMumbai:
                this.compareText(
                    selectors.networkMenu.selectedPolygonMumbain_Text,
                    networks.polygonMumbai,
                    1,
                );
                break;
            case networks.scrollSepolia:
                this.compareText(
                    selectors.networkMenu.selectedScrollSepoliaNetwork_Text,
                    networks.scrollSepolia,
                    1,
                );
                break;
            case networks.sepolia:
                this.compareText(
                    selectors.networkMenu.selectedSepoliaNetwork_Text,
                    networks.sepolia,
                    1,
                );
                break;
        }
    }
    checkWalletOptions() {
        this.clickConnectWallet();
        this.compareText(
            selectors.walletMenu.injectedMetamask_Button,
            wallets.injectedMetamask,
            1,
        );
        this.compareText(
            selectors.walletMenu.metamask_Button,
            wallets.metamask,
            1,
        );
        this.compareText(
            selectors.walletMenu.coinBase_Button,
            wallets.coinBase,
            1,
        );
    }
    checkSettingsDropdown() {
        this.clickSettings();
        this.compareText(
            selectors.settings.interfaceSettingsTitle_Text,
            textData.interfaceSettings,
        );
        this.compareText(selectors.settings.darkTheme_Text, textData.darkTheme);
        this.compareText(
            selectors.settings.decentralizationMode_Text,
            textData.decentralizationMode,
        );
        this.compareText(
            selectors.settings.stagingMode_Text,
            textData.stagingMode,
        );
    }
    // selects networks from network dropdown and checks if it's been selected
    selectNetwork(network: string) {
        this.clickNetwork();
        switch (network) {
            case networks.polygonMumbai:
                this.click(
                    selectors.networkMenu.polygonMumbaiNetwork_Option,
                    1,
                );
                break;
            case networks.scrollSepolia:
                this.click(
                    selectors.networkMenu.scrollSepoliaNetwork_Option,
                    1,
                );
                break;
            case networks.sepolia:
                this.click(selectors.networkMenu.sepoliaNetwork_Option, 1);
                break;
        }
    }
    checkTextOnHomePage() {
        this.compareText(
            selectors.heroSection.heroTitle_Text,
            textData.heroSectionTitle,
        );
        this.compareText(
            selectors.heroSection.heroDescription_Text,
            textData.heroSectionDescription,
        );
        this.compareText(
            selectors.campaignsSection.latestCampaign_Text,
            textData.latestCampaigns,
        );
        this.compareText(
            selectors.templatesSection.templates_Text,
            textData.templatest,
        );
        this.compareText(
            selectors.footer.footerAbout_Text,
            textData.footerAbout,
        );
        this.compareText(
            selectors.footer.footerCommunity_Text,
            textData.footerCommunity,
        );
    }
    checkHowItWorksPreview() {
        this.clickHowItWorks();
        this.elementIsVisible(selectors.heroSection.howItWorksVideo_Preview);
    }
    checkActiveCampaign() {
        // todo: find out how to return all elements; ATM returning 1 selector; there are 5 on front-end with same partial id
        cy.get("[data-testid*='campaign-title']").then(($el) => {
            // Check if there's at least one element
            if ($el.length > 0) {
                const randomIndex = Math.floor(Math.random() * $el.length);

                cy.wrap($el.eq(randomIndex))
                    .invoke("text")
                    .then((textFromElement) => {
                        // Put title into variable
                        campaignData.title =
                            typeof textFromElement === "string"
                                ? textFromElement
                                : "";
                        // Check redirection to selected campaign page
                        this.click(
                            selectors.campaignsSection.viewCampaign_Button,
                            randomIndex,
                        );
                        // todo: add assertion of title when redirected to campaigns page when we have selector
                    });
            } else {
                cy.log("No active campaigns.");
            }
        });
    }
    checkFirstTemplate() {
        this.compareText(
            selectors.templatesSection.templateErc20KPIToken_Text,
            templateData.erc20Title,
        );
    }
    checkRedirectionToFirstTemplate() {
        this.click(selectors.templatesSection.useTemplate_Button);
        this.checkUrl(urls.createCampaign);
    }
    checkFooterRedirections() {
        const footerLinks = [
            selectors.footer.footerDocumentation_Link,
            selectors.footer.footerAudits_Link,
            selectors.footer.footerDiscord_Link,
            selectors.footer.footerTwitter_Link,
            selectors.footer.footerCarrotInfoPage_Button,
        ];

        const footerUrls = [
            urls.documentation,
            urls.audits,
            urls.discord,
            urls.twitter,
            urls.carrotInfoPage,
        ];

        for (let i = 0; i < footerLinks.length; i++) {
            this.click(footerLinks[i]);
            this.checkUrl(footerUrls[i]);
        }
    }
    selectWalletConnection(wallet: string) {
        this.clickConnectWallet();
        switch (wallet) {
            case wallets.injectedMetamask:
                this.click(selectors.walletMenu.injectedMetamask_Button, 1);
                break;
            case wallets.metamask:
                this.click(selectors.walletMenu.metamask_Button, 1);
                break;
            case wallets.coinBase:
                this.click(selectors.walletMenu.coinBase_Button, 1);
                break;
        }
    }
    checkProfileWithoutRecentActivity() {
        this.clickProfileAvatar();
        this.compareText(
            selectors.noData.emptySpace_Text,
            textData.emptySpace,
            1,
        );
        this.compareText(
            selectors.noData.noDataFound_Text,
            textData.noDataFound,
            1,
        );
    }
    logout() {
        this.clickProfileAvatar();
        this.clickPowerButton();
    }
}
const homePage = new HomePage();
export { homePage };

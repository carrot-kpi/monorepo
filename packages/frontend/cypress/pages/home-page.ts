import { BasePage } from "./base-page";
import * as selectors from "../utils/selectors";
import {
    textData,
    urls,
    networks,
    wallets,
    campaignData,
    templateData,
} from "../utils/data";
/**
 * @exports default methods used in all tests
 */
const env = Cypress.env("ENV");

export class HomePage extends BasePage {
    goBack() {
        cy.go("back");
    }
    //---Clicks
    clickCampaignsHeader() {
        this.click(selectors.header.campaigns_Button);
    }
    clickNetwork() {
        this.click(selectors.networkMenu.networkDropdown_Button);
    }
    clickConnectWallet() {
        this.click(selectors.walletMenu.connectWallet_Button);
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
        this.click(selectors.header.profileAvatar_Button, 0);
    }
    clickPowerButton() {
        this.click(selectors.header.power_Button, 0);
    }
    //---Assertions
    connectWalletButtonVisible(visible: boolean) {
        visible
            ? this.elementIsVisible(selectors.walletMenu.connectWallet_Button)
            : this.elementNotExist(selectors.walletMenu.connectWallet_Button);
    }
    profileAvatarVisible(visible: boolean) {
        visible
            ? this.elementIsVisible(selectors.header.profileAvatar_Button, 0)
            : this.elementNotExist(selectors.header.profileAvatar_Button);
    }
    checkBanner() {
        if (env == "dev") {
            this.compareText(
                selectors.header.banner_Text,
                textData.devBannerText,
            );
        } else {
            this.compareText(
                selectors.header.banner_Text,
                textData.stagingBannerText,
            );
        }
    }
    // todo: this should be in separate page regarding all campaigns
    checkIfOnAllCampaignsPage() {
        this.checkUrl(urls.allCampaigns);
    }
    // todo: network drop-down options have been removed
    checkNetworkOptions() {
        this.clickNetwork();
        if (env == "dev") {
            this.compareText(
                selectors.networkMenu.arbitrumNetwork_Option,
                networks.arbitrum,
            );
        } else {
            this.compareText(
                selectors.networkMenu.sepoliaNetwork_Option,
                networks.sepolia,
            );
        }
    }
    checkSelectedNetwork() {
        if (env == "dev") {
            this.elementIsVisible(selectors.networkMenu.selectedArbitrum_Icon);
        } else {
            this.elementIsVisible(
                selectors.networkMenu.selectedSepoliaNetwork_Icon,
            );
        }
    }
    checkWalletOptions() {
        this.clickConnectWallet();
        this.compareText(
            selectors.walletMenu.coinBase_Button,
            wallets.coinBase,
        );
        this.compareText(
            selectors.walletMenu.metamask_Button,
            wallets.metamask,
        );
        this.compareText(
            selectors.walletMenu.walletConnect_Button,
            wallets.walletConnect,
        );
        this.clickAnyWhereToClose();
    }
    // todo: removed from FE
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
    // todo: selecting networks has been removed from test envs
    // selectNetwork(network: string) {
    //     this.clickNetwork();
    //     switch (network) {
    //         case networks.polygonMumbai:
    //             this.click(selectors.networkMenu.polygonMumbaiNetwork_Option);
    //             break;
    //         case networks.scrollSepolia:
    //             this.click(selectors.networkMenu.scrollSepoliaNetwork_Option);
    //             break;
    //         case networks.sepolia:
    //             this.click(selectors.networkMenu.sepoliaNetwork_Option);
    //             break;
    //     }
    // }
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
    checkFirstActiveCampaign() {
        cy.get("[data-testid*='campaign-title']").then(($el) => {
            if ($el) {
                cy.wrap($el)
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
    checkFooterHyperlinks() {
        const footerLinks = [
            selectors.footer.footerDocumentation_Link,
            selectors.footer.footerAudits_Link,
            selectors.footer.footerDiscord_Link,
            selectors.footer.footerTwitter_Link,
            selectors.footer.footerCarrotInfoPage_Button,
        ];

        for (let i = 0; i < footerLinks.length; i++) {
            this.elementIsVisible(footerLinks[i]);
        }
    }
    selectWalletConnection(wallet: string) {
        this.clickConnectWallet();
        switch (wallet) {
            case wallets.metamask:
                this.click(selectors.walletMenu.metamask_Button);
                break;
            case wallets.coinBase:
                this.click(selectors.walletMenu.coinBase_Button);
                break;
        }
    }
    // todo: add assertions for DRAFT tab once we have IDs on FE
    checkProfileWithoutRecentActivity() {
        this.clickProfileAvatar();
        this.compareText(
            selectors.noData.emptySpace_Text,
            textData.emptySpace,
            0,
        );
        // this.compareText(
        //     selectors.noData.noDataFound_Text,
        //     textData.noDataFound,
        //     0,
        // );
    }
    logout() {
        this.clickProfileAvatar();
        this.clickPowerButton();
    }
}
const homePage = new HomePage();
export { homePage };

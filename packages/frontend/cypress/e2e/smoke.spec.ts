import { homePage } from "../pages/home-page";
import { createCampaign } from "../pages/create-campaign-page";
import * as data from "../utils/data";
import { utility } from "utils/choose_env";
/**
 *@description Smoke test for Carrot Home page
 */
const url = utility.getBaseUrl();

describe("Guest no wallet - Home page assertions", () => {
    beforeEach(() => {
        cy.visit(url);
    });

    it("Banner is visible", () => {
        homePage.checkBanner();
    });
    it("Campaigns button redirects to All campaigns page", () => {
        homePage.clickCampaignsHeader();
        homePage.checkIfOnAllCampaignsPage();
        homePage.goBack();
    });
    it("Check default selected network", () => {
        homePage.checkSelectedNetwork();
    });
    it("Check connect wallet menu options", () => {
        homePage.checkWalletOptions();
    });
    it("Check text on Home page", () => {
        homePage.checkTextOnHomePage();
    });
    it("Create campaign button redirects to Create campaign page - Wallet disconnected modal is displayed", () => {
        homePage.clickCreateCampaign();
        createCampaign.checkCreateCampaignUrl();
        createCampaign.checkWalletDisconnectedText();
        homePage.goBack();
    });
    // todo: this has been disabled
    // it("Check How it works video", () => {
    //     homePage.checkHowItWorksPreview();
    // });
    it("Check random active campaign redirection", () => {
        homePage.checkFirstActiveCampaign();
        homePage.goBack();
    });
    it("View all campaigns button redirects to All campaigns page", () => {
        homePage.clickViewAllCampaigns();
        homePage.checkIfOnAllCampaignsPage();
        homePage.goBack();
    });
    it("Check first template title", () => {
        homePage.checkFirstTemplate();
    });
    it("Use template button redirects to Create campaign page for that template - Wallet disconnected modal is displayed", () => {
        homePage.checkRedirectionToFirstTemplate();
        createCampaign.checkWalletDisconnectedText();
        homePage.goBack();
    });
    it("Check Footer links", () => {
        homePage.checkFooterHyperlinks();
    });
});
describe.only("User with connected wallet", () => {
    beforeEach(() => {
        cy.visit(url);
    });
    it("Connect wallet to Metamask", () => {
        homePage.selectWalletConnection(data.wallets.metamask);
        cy.acceptMetamaskAccess().then((connected) => {
            expect(connected).to.be.true;
        });
        homePage.clickAnyWhereToClose(); // closing profile menu
        homePage.profileAvatarVisible(true);
        homePage.connectWalletButtonVisible(false);
    });
    it("Check no recent activity on Profile Avatar dropdown", () => {
        cy.wait(1500);
        homePage.checkProfileWithoutRecentActivity();
        homePage.clickAnyWhereToClose();
    });
    it("Create campaign button redirects to Create campaign page - Welcome to Carrot modal is displayed", () => {
        homePage.clickCreateCampaign();
        createCampaign.checkCreateCampaignUrl();
        createCampaign.checkWelcomeToCarrotModal();
        homePage.goBack();
    });
    it("Use template button redirects to Create campaign page for that template - Welcome to Carrot modal is displayed", () => {
        homePage.checkRedirectionToFirstTemplate();
        createCampaign.checkWelcomeToCarrotModal();
        homePage.goBack();
    });
    it("Logout user", () => {
        cy.wait(1500);
        homePage.logout();
        homePage.profileAvatarVisible(false);
        homePage.connectWalletButtonVisible(true);
    });
});

import { homePage } from "cypress/pages/home_page";
import { networks } from "cypress/utils/data";
/**
 *@description Smoke test for Carrot Home page
 */
describe("Guest no wallet - Home page assertions", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Staging banner is visible", () => {
        homePage.checkStagingBanner();
    });
    // todo: find out how to handle redirection to new tab in Cypress
    // it("About button redirects to Carrot community page", () => {
    // });
    it("Campaigns button redirects to All campaigns page", () => {
        homePage.clickCampaignsHeader();
        homePage.checkIfOnAllCampaignsPage();
        homePage.goBack();
    });
    it("Check default selected network", () => {
        homePage.checkSelectedNetwork(networks.polygonMumbai);
    });
    it("Check Network dropdown options", () => {
        homePage.checkNetworkOptions();
    });
    it("Check connect wallet dropdown options", () => {
        homePage.checkWalletOptions();
    });
    it("Check Settings dropdown", () => {
        homePage.checkSettingsDropdown();
    });
    // todo: check if network switching can be done in a loop
    it("Switch to Scroll sepolia network", () => {
        homePage.selectNetwork(networks.scrollSepolia);
        homePage.checkSelectedNetwork(networks.scrollSepolia);
    });
    it("Switch to Sepolia network", () => {
        homePage.selectNetwork(networks.sepolia);
        homePage.checkSelectedNetwork(networks.sepolia);
    });
    it("Check text on Home page", () => {
        homePage.checkTextOnHomePage();
    });
    it("Create campaign button redirects to Create campaign page - Wallet disconnected modal is displayed", () => {
        homePage.checkCreateCampaignButtonRedirection();
        homePage.checkWalletDisconnectedText();
        homePage.goBack();
    });
    it("Check How it works video", () => {
        homePage.checkHowItWorksPreview();
    });
    it("Check random active campaign redirection", () => {
        homePage.checkActiveCampaign();
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
        homePage.checkWalletDisconnectedText();
        homePage.goBack();
    });
    // todo: find out how to handle redirection to new tab in Cypress
    // it("Check Footer links redirection", () => {
    //     homePage.checkFooterRedirections();
    // });
});

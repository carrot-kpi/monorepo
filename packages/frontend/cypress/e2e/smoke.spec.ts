import { homePage } from "../pages/home-page";
import { createCampaign } from "../pages/create-campaign-page";
import { networks, wallets } from "../utils/data";
import { utility } from "utils/choose_env";
/**
 *@description Smoke test for Carrot Home page
 */
const url = utility.getBaseUrl();

describe("Guest no wallet - Home page assertions", () => {
    beforeEach(() => {
        cy.visit(url);
    });

    it("Staging banner is visible", () => {
        homePage.checkStagingBanner();
    });
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
        homePage.clickCreateCampaign();
        createCampaign.checkCreateCampaignUrl();
        createCampaign.checkWalletDisconnectedText();
        homePage.goBack();
    });
    it("Check How it works video", () => {
        homePage.checkHowItWorksPreview();
    });
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
// todo: uncomment when connecting wallet flow is fixed
describe("User with connected wallet", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Connect wallet to Metamask", () => {
        homePage.selectWalletConnection(wallets.metamask);
        cy.acceptMetamaskAccess().then((connected) => {
            expect(connected).to.be.true;
        });
        // todo: remove reload after we have IDs on FE for closing users overlay
        cy.reload();
        homePage.profileAvatarVisible(true);
        homePage.connectWalletButtonVisible(false);
    });
    it("Check no recent activity on Profile Avatar dropdown", () => {
        cy.wait(1500);
        homePage.checkProfileWithoutRecentActivity();
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

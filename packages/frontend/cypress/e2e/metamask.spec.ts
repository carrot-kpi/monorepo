import { homePage } from "../pages/home-page";
/**
 *@description Smoke test for Carrot Home page
 */
const path = "/cypress/utils/metamask/metamask-chrome-11.6.3.zip";
const file = "metamask-chrome-11.6.3.zip";
describe.only("Guest no wallet - Home page assertions", () => {
    beforeEach(() => {
        cy.task("unzipping", { path, file });
        cy.log("Unzipping finished...");
        cy.log("Navigating to Home page...");
        cy.visit("/");
    });
    it("Staging banner is visible", () => {
        homePage.checkStagingBanner();
    });
});

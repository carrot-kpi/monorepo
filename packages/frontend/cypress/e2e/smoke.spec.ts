import { homePage } from "cypress/pages/home_page";
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
});

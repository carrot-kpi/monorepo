/// <reference types="cypress" />

const path = "/cypress/utils/metamask/metamask-chrome-11.6.3.zip";
const file = "metamask-chrome-11.6.3.zip";

describe("Metamask", () => {
    it("Unzipp metamask extension", () => {
        cy.task("unzipping", { path, file });
    });
});

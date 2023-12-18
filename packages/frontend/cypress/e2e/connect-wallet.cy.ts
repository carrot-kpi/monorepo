/**
 * Connect wallet test
 */

describe("Connect with Metamask", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Should connect Carrot with Metamask on Mumbai network", () => {
        cy.get('[data-testid="connect-wallet-button"]').eq(1).click();

        cy.get('[data-testid="metaMask-wallet-button"]').eq(1).click();

        cy.switchToMetamaskNotification().then(() => {
            cy.acceptMetamaskAccess();
        });

        cy.get('[data-testid="profile-avatar-button"]')
            .eq(1)
            .should("be.visible");
        cy.pause();
    });
});

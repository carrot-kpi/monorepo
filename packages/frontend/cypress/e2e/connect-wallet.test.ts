/**
 * Connect wallet test 
 */

describe("Connect with Metamask", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Should connect Carrot with Metamask", () => {
      cy.get("div")
        .contains("Network")
        .eq(2)
        .click();
  
      cy.get('[data-testid="Sepolia-network-button"]')
        .eq(1)
        .click();
  
      cy.get('[data-testid="connect-wallet-button"]')
        .eq(1)
        .click();
  
      cy.get('[data-testid="metaMask-wallet-button"]')
        .eq(1)
        .click();
  
      // Assuming you have a custom command or utility to handle accepting access
      cy.acceptMetamaskAccess();
  
      cy.get('[data-testid="profile-avatar-button"]')
        .eq(1)
        .should("be.visible");
    });
  });
  
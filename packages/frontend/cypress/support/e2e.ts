/// <reference types="Cypress" />

import "./commands";
import "@synthetixio/synpress/support";

console.log("setting up metamask");

if (process.env.CI) {
    // before(() => {
    //     cy.setupMetamask(
    //         "test test test test test test test test test test test junk",
    //         "mumbai",
    //         "test-password",
    //     );
    // });
}

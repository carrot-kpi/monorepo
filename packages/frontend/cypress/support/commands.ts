import "cypress-hardhat/lib/browser";
import { Eip1193Bridge } from "@ethersproject/experimental/lib/eip1193-bridge";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface ApplicationWindow {
            ethereum: Eip1193Bridge;
        }
    }
}

// sets up the injected provider to be a mock ethereum provider with the given mnemonic/index
Cypress.Commands.overwrite(
    "visit",
    (
        original,
        url: string | Partial<Cypress.VisitOptions>,
        options?: Partial<Cypress.VisitOptions>,
    ) => {
        if (typeof url !== "string")
            throw new Error(
                "Invalid arguments. The first argument to cy.visit must be the path.",
            );

        return cy.provider().then((provider) =>
            original({
                ...options,
                url,
                onBeforeLoad(win) {
                    options?.onBeforeLoad?.(win);

                    // Inject the mock ethereum provider.
                    win.ethereum = provider;
                },
            }),
        );
    },
);

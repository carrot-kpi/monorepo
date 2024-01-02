/**
 * @exports default methods used in all tests
 */
export class BasePage {
    click(element: string, index?: number) {
        index !== undefined
            ? cy.get(element).eq(index).click()
            : cy.get(element).first().click();
    }
    checkUrl(url: string) {
        cy.url().should("include", url);
    }
    compareText(element: string, text: string, index?: number) {
        if (index !== undefined) {
            cy.get(element)
                .eq(index)
                .should(($el) => {
                    expect($el).to.contain(text);
                });
        } else {
            cy.get(element).should(($el) => {
                expect($el).to.contain(text);
            });
        }
    }
    elementIsVisible(element: string, index?: number) {
        index !== undefined
            ? cy.get(element).eq(index).should("be.visible")
            : cy.get(element).should("be.visible");
    }
    // element not visible in DOM
    elementNotExist(element: string) {
        cy.get(element).should("not.exist");
    }
}

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
    // removing attribute "target" from element before clicking it; opens the page in the same tab instead of the new one
    checkRedirectionToNewTab(
        selector: string,
        url: string,
        parentSelector?: boolean,
    ) {
        if (parentSelector) {
            cy.get(selector).parent().invoke("removeAttr", "target").click();
        } else {
            cy.get(selector).invoke("removeAttr", "target").click();
        }
        this.checkUrl(url);
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
    // element not visible on FE; visible in DOM
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

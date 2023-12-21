/**
 * @exports default methods used in all tests
 */
export class BasePage {
    click(element: string, index?: number) {
        index
            ? cy.get(element).eq(index).click()
            : cy.get(element).first().click();
    }
    compareText(element: string, text: string, index?: number) {
        if (index) {
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
}

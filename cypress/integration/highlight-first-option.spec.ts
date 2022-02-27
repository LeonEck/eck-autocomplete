beforeEach(() => {
  cy.visit('/e2e-test-cases/highlight-first-option/');
});

describe('highlight-first-option', () => {
  it('should not highlight anything when attribute is not present', () => {
    cy.get('#input1').focus();
    cy.get('#complete1 > eck-autocomplete-option')
      .first()
      .should('not.have.class', 'highlighted');
  });

  it('should highlight first option when attribute is set to the string "null"', () => {
    cy.get('#input2').focus();
    cy.get('#complete2 > eck-autocomplete-option')
      .first()
      .should('have.class', 'highlighted');
  });

  it('should highlight first option when attribute is set to an empty string', () => {
    cy.get('#input3').focus();
    cy.get('#complete3 > eck-autocomplete-option')
      .first()
      .should('have.class', 'highlighted');
  });

  it('should not highlight first option when attribute is set to the string "false"', () => {
    cy.get('#input4').focus();
    cy.get('#complete4 > eck-autocomplete-option')
      .first()
      .should('not.have.class', 'highlighted');
  });

  it('should highlight first option when attribute is set to the string "true"', () => {
    cy.get('#input5').focus();
    cy.get('#complete5 > eck-autocomplete-option')
      .first()
      .should('have.class', 'highlighted');
  });

  it('should highlight first option when attribute is set to an arbitrary string', () => {
    cy.get('#input6').focus();
    cy.get('#complete6 > eck-autocomplete-option')
      .first()
      .should('have.class', 'highlighted');
  });

  it('should highlight first option when attribute is set as a boolean attribute', () => {
    cy.get('#input7').focus();
    cy.get('#complete7 > eck-autocomplete-option')
      .first()
      .should('have.class', 'highlighted');
  });
});

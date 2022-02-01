describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('/e2e-test-cases/');
    cy.contains('E2E Test');
  });
});

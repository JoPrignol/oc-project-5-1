describe('Route Guard Test', () => {

  it('should redirect to login if user is not logged in', () => {

    cy.visit('/sessions');

    cy.url().should('include', '/login');
  });
});

describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 2,
        username: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/auth/login',
      },
      []).as('login')

      cy.get('input[formControlName=firstName]').type("Test")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type("user@test.fr")
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login')
  });
});

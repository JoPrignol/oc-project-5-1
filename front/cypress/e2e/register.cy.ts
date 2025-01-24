describe('Register spec', () => {

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `user${randomString}@test.fr`;
  }

  it('Register successfull', () => {
    cy.visit('/register')
    const mail = generateRandomEmail();


    // //*** MOCK POUR COVERAGE

    // cy.intercept('POST', '/api/auth/register', {
    //   body: {
    //     id: 2,
    //     username: `${mail}`,
    //     firstName: 'Test',
    //     lastName: 'User',
    //     admin: true
    //   },
    // })

    // cy.intercept('POST', '/api/auth/login', {
    //   body: {
    //     id: 2,
    //     username: `${mail}`,
    //     firstName: 'Test',
    //     lastName: 'User',
    //     admin: true
    //   },
    // }).as('login')

    //   //***



      cy.get('input[formControlName=firstName]').type("Test")
      cy.get('input[formControlName=lastName]').type("User")
      cy.get('input[formControlName=email]').type(`${mail}`)
      cy.get('input[formControlName=password]').type("password123!")

      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login')

      cy.get('input[formControlName=email]').type(`${mail}`)
      cy.get('input[formControlName=password]').type(`${"password123!"}{enter}{enter}`)

      cy.url().should('include', '/sessions')

      cy.get('[data-testid="account-button"]').click();

      cy.url().should('include', '/me')

      cy.get('[data-testid="user-name"]').should('contain', 'Name: Test USER');
      cy.get('[data-testid="user-email"]').should('contain', `${mail}`);

      cy.get('[data-testid="back-button"]').click();
      cy.url().should('not.include', '/me');

      cy.get('[data-testid="account-button"]').click();

      cy.get('[data-testid="delete-account-button"]').click();

      cy.url().should('include', '/')
  });
});

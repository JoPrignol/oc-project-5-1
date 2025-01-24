describe('Account spec', () => {

  beforeEach(() => {
    cy.clearCookies();

    cy.visit('/login')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')

    // Visite de account
    cy.get('[data-testid="account-button"]').click();

    cy.url().should('include', '/me')


  });

  it('Account has user name', () => {
    cy.get('[data-testid="user-name"]').should('contain', 'Name: Admin ADMIN');
  });

  it('Account has user email', () => {
    cy.get('[data-testid="user-email"]').should('contain', 'Email: yoga@studio.com');
  });

  it('Account has you are admin for admin account', () => {
    cy.get('[data-testid="user-isAdmin"]').should('contain', 'You are admin');
  });

  it('Account doesnt have delete button for admin account', () => {
    cy.get('[data-testid="delete-account-button"]').should('not.exist');
  });

});

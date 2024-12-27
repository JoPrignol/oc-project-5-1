describe('Account spec', () => {

  beforeEach(() => {
    cy.clearCookies();


    // //*** MOCK POUR COVERAGE

    //     // Interception des requêtes POST envoyées à /api/auth/login
    //     cy.intercept('POST', '/api/auth/login', {
    //       // Simulation de la réponse du serveur
    //       body: {
    //         email: 'yoga@studio.com',
    //         firstName: 'admin',
    //         lastName: 'ADMIN',
    //         admin: true
    //       },
    //     }).as('login')

    //     cy.intercept('GET', '/api/user/1', {
    //       // Simulation de la réponse du serveur
    //       body: {
    //         "id": 1,
    //         "email": "yoga@studio.com",
    //         "lastName": "Admin",
    //         "firstName": "Admin",
    //         "admin": true,
    //         "createdAt": "2024-11-22T17:18:55",
    //         "updatedAt": "2024-11-22T17:18:55"
    //     },
    //     }).as('getUser')

    //     // Interception des requêtes GET envoyées à /api/session
    //     cy.intercept(
    //       {
    //         method: 'GET',
    //         url: '/api/session',
    //       },
    //       // Simulation d'une réponse vide
    //       []).as('session')


    //       //***

    cy.visit('/login')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  });

  it('Account has all of the users informations', () => {

    cy.url().should('include', '/sessions')

    // Visite de account
    cy.get('[data-testid="account-button"]').click();

    cy.url().should('include', '/me')

    // cy.wait('@getUser');
    cy.get('[data-testid="user-name"]').should('be.visible').then(() => {
      cy.log('Nom de l utilisateur visible');
    });
    cy.screenshot();

    cy.get('[data-testid="user-name"]').should('contain', 'Name: Admin ADMIN');
    cy.get('[data-testid="user-email"]').should('contain', 'Email: yoga@studio.com');
    cy.get('[data-testid="user-isAdmin"]').should('contain', 'You are admin');

  });

});

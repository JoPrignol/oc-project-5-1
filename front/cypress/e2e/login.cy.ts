// Déclaration d'un groupe de tests
describe('Login spec', () => {
  // Définition d'un cas de test
  it('Login successfull', () => {
    // Navigation vers la page /login
    cy.visit('/login')

    // Simulation de la saisie de l'email et du mot de passe
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    // Vérification de la redirection vers la page /sessions
    cy.url().should('include', '/sessions')
  })

  it('login not successful', () => {
    cy.visit('/login')

    cy.get('input[formControlName=email]').type("random_unregistered@email.com")
    cy.get('input[formControlName=password]').type(`${"Test1234!"}{enter}{enter}`)

    cy.get('[data-testid="error-login"]').should('be.visible')
  });


  it('should redirect to login if user is not logged in', () => {

    cy.visit('/sessions');

    cy.url().should('include', '/login');
  });

});

describe('Session details spec', () => {

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `user${randomString}@test.fr`;
  }

  beforeEach(() => {
    cy.visit('/login')
    cy.clearCookies();

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  });


  it('Create a session with admin, then register and participate as user', () => {


    cy.get('[data-testid="create-button"]').should('be.visible').then(() => {
      cy.log('Bouton de création trouvé');
    });
    cy.screenshot();

    // Créer une session test
    cy.get('[data-testid="create-button"]').click();

    // Vérifier qu'on est bien sur la page /sessions
    cy.url().should('include', '/sessions')

    // Vérifier qu'on est bien sur la page /sessions/create
    cy.url().should('include', '/create')

    // Vérifier que le bouton de validation est désactivé en l'absence de remplissage du formulaire
    cy.get('button[type="submit"]').should('be.disabled');

    // Nomer la session de test
    cy.get('input[formControlName="name"]').type('Test Session');

    // Remplir la date
    cy.get('input[formControlName="date"]').type('2024-12-27');

    // Sélectionner un prof dans le menu déroulant
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains('Margot DELAHAYE').click();

    // Ajouter la description
    cy.get('textarea[formControlName="description"]').type('Test description test.');

    // Valider le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la session contient bien les bons détails
    cy.get('[data-testid="session-name"]').should('contain', 'Test Session');
    cy.get('[data-testid="session-description"]').should('contain', 'Test description test.');



    // Création d'un utilisateur non admin
    cy.visit('/register')
    const mail = generateRandomEmail();

    cy.get('input[formControlName=firstName]').type("Test")
    cy.get('input[formControlName=lastName]').type("User")
    cy.get('input[formControlName=email]').type(`${mail}`)
    cy.get('input[formControlName=password]').type("password123!")

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login')

    cy.get('input[formControlName=email]').type(`${mail}`)
    cy.get('input[formControlName=password]').type(`${"password123!"}{enter}{enter}`)

    cy.url().should('include', '/sessions')


    //Participation à la session
    cy.get('[data-testid="detail-button"]').first().click();

    cy.get('[data-testid="participate-button"]').click();

    cy.get('[data-testid="unparticipate-button"]').should('be.visible')

    cy.get('[data-testid="unparticipate-button"]').click();

    cy.get('[data-testid="participate-button"]').should('be.visible')


    //Suppression du compte
    cy.get('[data-testid="account-button"]').click();

    cy.get('[data-testid="delete-account-button"]').click();

    cy.get('.mat-snack-bar-container').should('contain.text', 'Your account has been deleted !');


    // Connexion sur compte admin pour supprimer la session
    cy.visit('/login')
    cy.clearCookies();

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)


    // Effacer la session test
    cy.url().should('include', '/sessions')

    // Click sur le bouton de détail de la session
    cy.get('[data-testid="detail-button"]').first().click();

    // Click sur le bouton de suppression
    cy.get('button[color="warn"]').first().click();

    // Vérification de la redirection vers la page /sessions
    cy.url().should('include', '/sessions')


  });
});

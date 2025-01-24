describe('Session details spec', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.clearCookies();

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  });


  it('Create modify and delete a session', () => {

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

        // cy.wait('@getTeachers');

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

        // cy.wait('@getSessions');

    // Valider le formulaire
    cy.get('button[type="submit"]').click();

        // cy.wait('@createSession');

    // Vérifier que la session contient bien les bons détails
    cy.get('[data-testid="session-name"]').should('contain', 'Test Session');
    cy.get('[data-testid="session-description"]').should('contain', 'Test description test.');




    // Modifier la session de test
    cy.get('[data-testid="edit-button"]').first().click();

    // Nomer la session de test
    cy.get('input[formControlName="name"]').clear().type('Test Session Modified');

    // Remplir la date
    cy.get('input[formControlName="date"]').type('2024-12-28');

    // Sélectionner un prof dans le menu déroulant
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains('Hélène THIERCELIN').click();

    // Ajouter la description
    cy.get('textarea[formControlName="description"]').clear().type('Test description test modified.');

    // Valider le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que la session contient bien les bons détails
    cy.get('[data-testid="session-name"]').should('contain', 'Test Session Modified');
    cy.get('[data-testid="session-description"]').should('contain', 'Test description test modified.');




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

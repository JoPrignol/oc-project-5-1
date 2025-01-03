describe('Session details spec', () => {

  beforeEach(() => {
    cy.visit('/login')
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

    //     // Interception des requêtes GET envoyées à /api/session
    //     cy.intercept(
    //       {
    //         method: 'GET',
    //         url: '/api/session',
    //       },
    //       // Simulation d'une réponse vide
    //       []).as('session')


    //       cy.intercept('GET', '**/teacher', {
    //         statusCode: 200,
    //         body: [
    //           {
    //               "id": 1,
    //               "lastName": "DELAHAYE",
    //               "firstName": "Margot",
    //               "createdAt": "2024-11-22T17:18:55",
    //               "updatedAt": "2024-11-22T17:18:55"
    //           },
    //           {
    //               "id": 2,
    //               "lastName": "THIERCELIN",
    //               "firstName": "Hélène",
    //               "createdAt": "2024-11-22T17:18:55",
    //               "updatedAt": "2024-11-22T17:18:55"
    //           }
    //         ]
    //       }).as('getTeachers');

    //       cy.intercept('GET', '/api/session', {
    //         statusCode: 200,
    //         body: [
    //           {
    //             id: 123,
    //             name: 'Test Session',
    //             date: '2024-12-27',
    //             teacher: {
    //               id: 1,
    //               lastName: 'DELAHAYE',
    //               firstName: 'Margot',
    //             },
    //             description: 'Test description test.',
    //           },
    //         ],
    //       }).as('getSessions');

    //       cy.intercept('POST', '/api/session', {
    //         statusCode: 201, // 201 Created
    //         body: {
    //           id: 124,
    //           name: 'Test Session',
    //           date: '2024-12-27',
    //           teacher: {
    //             id: 1,
    //             lastName: 'DELAHAYE',
    //             firstName: 'Margot',
    //           },
    //           description: 'Test description test.',
    //         },
    //       }).as('createSession');

    //       cy.intercept('GET', '**/session/123', {
    //         statusCode: 200,
    //         body: [
    //           {
    //             id: 123,
    //             name: 'Test Session',
    //             date: '2024-12-27',
    //             teacher_id: 1,
    //             description: 'Test description test.',
    //           },
    //         ],
    //       }).as('getSession');

    //       cy.intercept('GET', '**/teacher/1', {
    //         statusCode: 200,
    //         body:
    //           {
    //               "id": 1,
    //               "lastName": "DELAHAYE",
    //               "firstName": "Margot",
    //               "createdAt": "2024-11-22T17:18:55",
    //               "updatedAt": "2024-11-22T17:18:55"
    //           }
    //       }).as('getTeacher');



    // //***

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

        // cy.url().should('include', '/sessions/update/123');
        // cy.wait('@getSession');
        // // cy.wait('@getTeacher');
        // cy.get('input[formControlName="name"]').should('be.visible');

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

    // // Vérifier que la session contient bien les bons détails
    // cy.get('[data-testid="session-name"]').should('contain', 'Test Session');
    // cy.get('[data-testid="session-description"]').should('contain', 'Test description test.');

    // Click sur le bouton de détail de la session
    cy.get('[data-testid="detail-button"]').first().click();

    // Click sur le bouton de suppression
    cy.get('button[color="warn"]').first().click();

    // Vérification de la redirection vers la page /sessions
    cy.url().should('include', '/sessions')


  });
});

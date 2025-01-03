describe('Session form spec', () => {

  beforeEach(() => {
    // Navigation vers la page de connexion avant chaque test
    cy.visit('/login');

    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').type("test!1234{enter}{enter}");

    // Vérification de la redirection vers la page /sessions
    cy.url().should('include', '/sessions');

    // Click sur le bouton de création de session
    cy.get('[data-testid="create-button"]').click();

    // Vérifier qu'on est bien sur la page /sessions/create
    cy.url().should('include', '/create')
  });

  it('Validation cannot happen because name is missing', () => {
    // Vérifier que le bouton est désactivé par défaut
    cy.get('button[type="submit"]').should('be.disabled');

    // Remplir les autres champs
    cy.get('input[formControlName="date"]').type('2024-12-27');
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains('Margot DELAHAYE').click();
    cy.get('textarea[formControlName="description"]').type('Test description test.');

    // Vérifier que le bouton est toujours désactivé
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Validation cannot happen because date is missing', () => {
    // Vérifier que le bouton est désactivé par défaut
    cy.get('button[type="submit"]').should('be.disabled');

    // Remplir les autres champs
    cy.get('input[formControlName="name"]').type('Test session');
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains('Margot DELAHAYE').click();
    cy.get('textarea[formControlName="description"]').type('Test description test.');

    // Vérifier que le bouton est toujours désactivé
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Validation cannot happen because no teacher is selected', () => {
    // Vérifier que le bouton est désactivé par défaut
    cy.get('button[type="submit"]').should('be.disabled');

    // Remplir les autres champs
    cy.get('input[formControlName="name"]').type('Test session');
    cy.get('input[formControlName="date"]').type('2024-12-27');
    cy.get('textarea[formControlName="description"]').type('Test description test.');

    // Vérifier que le bouton est toujours désactivé
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Validation cannot happen because description is missing', () => {
    // Vérifier que le bouton est désactivé par défaut
    cy.get('button[type="submit"]').should('be.disabled');

    // Remplir les autres champs
    cy.get('input[formControlName="name"]').type('Test session');
    cy.get('input[formControlName="date"]').type('2024-12-27');
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains('Margot DELAHAYE').click();

    // Vérifier que le bouton est toujours désactivé
    cy.get('button[type="submit"]').should('be.disabled');
  });

});
